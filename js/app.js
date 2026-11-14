(function () {
  "use strict";

  var CONFIG = window.NADRI_CONFIG;
  var DATA = window.NADRI_EVENTS || { events: [] };
  var CATS = CONFIG.categories;
  var REGIONS = CONFIG.regions;
  var FALLBACK_CAT = { label: "기타", color: "#888888" };
  function cat(ev) { return CATS[ev.category] || FALLBACK_CAT; }
  function name(ev) { return ev.title.replace(/^\[예시\]\s*/, ""); }
  function area(ev) { return [ev.sido, ev.city].filter(Boolean).join(" "); }
  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  var MAX_CHIPS = 3;

  var state = { region: null, year: 0, month: 0, hidden: {} };
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 날짜 유틸 ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseDate(s) {
    if (!s) return null;
    var p = s.split("T")[0].split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function timeOf(s) { return s && s.indexOf("T") > -1 ? s.split("T")[1] : ""; }
  function today() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function diffDays(a, b) { return Math.round((a - b) / 86400000); }
  function fmt(s) {
    var d = parseDate(s);
    var t = timeOf(s);
    return (d.getMonth() + 1) + "/" + d.getDate() + "(" + WEEKDAYS[d.getDay()] + ")" + (t ? " " + t : "");
  }
  function fmtRange(ev) {
    return ev.end && ev.end !== ev.start ? fmt(ev.start) + " ~ " + fmt(ev.end) : fmt(ev.start);
  }
  function dday(s) {
    var n = diffDays(parseDate(s), today());
    if (n === 0) return "D-DAY";
    return n > 0 ? "D-" + n : "종료";
  }

  /* ---------- 라우팅: #/지역/events/YYYY-MM ---------- */
  function parseHash() {
    var m = location.hash.match(/^#\/([\w-]+)(?:\/events\/(\d{4})-(\d{2}))?/);
    var t = today();
    state.region = m && REGIONS[m[1]] ? m[1] : CONFIG.defaultRegion;
    state.year = m && m[2] ? +m[2] : t.getFullYear();
    state.month = m && m[3] ? +m[3] - 1 : t.getMonth();
  }
  function hashFor(region, y, mo) {
    var d = new Date(y, mo, 1);
    return "#/" + region + "/events/" + d.getFullYear() + "-" + pad(d.getMonth() + 1);
  }

  /* ---------- 데이터 → 달력 항목 ---------- */
  function visibleEvents() {
    var region = REGIONS[state.region];
    return DATA.events.filter(function (ev) { return region.match(ev) && !state.hidden[ev.category]; });
  }

  // 14일이 넘는 상설·장기 행사는 달력 칸 대신 위쪽 띠에 표시
  var LONG_DAYS = 14;
  function isLong(ev) { return ev.end && diffDays(parseDate(ev.end), parseDate(ev.start)) >= LONG_DAYS; }
  function overlapsMonth(ev) {
    var first = new Date(state.year, state.month, 1), last = new Date(state.year, state.month + 1, 0);
    return parseDate(ev.start) <= last && parseDate(ev.end || ev.start) >= first;
  }

  function covers(ev, key) { return ev.start <= key && (ev.end || ev.start) >= key; }
  function longOn(events, key) { return events.filter(function (ev) { return isLong(ev) && covers(ev, key); }); }

  // 왼쪽 달력: 행사 기간의 각 날짜
  function eventItems(events) {
    var items = [];
    events.forEach(function (ev) {
      if (isLong(ev)) return;
      var s = parseDate(ev.start), e = parseDate(ev.end || ev.start);
      for (var d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        items.push({ date: ymd(d), ev: ev, type: "event",
          label: (ev.pick ? "⭐ " : "") + name(ev), isStart: ymd(d) === ev.start });
      }
    });
    return items;
  }

  // 오른쪽 달력: 신청 시작일 + 마감일
  function deadlineItems(events) {
    var items = [];
    events.forEach(function (ev) {
      if (ev.applyStart) items.push({ date: ev.applyStart.split("T")[0], ev: ev, type: "open", label: "오픈 · " + name(ev) });
      if (ev.applyEnd) items.push({ date: ev.applyEnd.split("T")[0], ev: ev, type: "close", label: "마감 · " + name(ev) });
    });
    return items;
  }

  function groupByDate(items) {
    var map = {};
    items.forEach(function (it) { (map[it.date] = map[it.date] || []).push(it); });
    return map;
  }

  /* ---------- 렌더링 ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function chip(it, passive) {
    var c = el(passive ? "span" : "button", "chip chip-" + it.type, it.label);
    var color = cat(it.ev).color;
    if (!passive) c.type = "button";
    c.style.setProperty("--c", color);
    c.dataset.id = it.ev.id;
    c.title = it.ev.title;
    if (it.type === "close" && parseDate(it.date) < today()) c.classList.add("past");
    if (it.type === "event" && parseDate(it.ev.end || it.ev.start) < today()) c.classList.add("past");
    if (!passive) c.addEventListener("click", function () { openDetail(it.ev); });
    return c;
  }

  function renderCalendar(container, items, kind, events) {
    var byDate = groupByDate(items);
    var first = new Date(state.year, state.month, 1);
    var lastDate = new Date(state.year, state.month + 1, 0).getDate();
    var todayStr = ymd(today());

    container.innerHTML = "";
    var grid = el("div", "grid");
    WEEKDAYS.forEach(function (w, i) {
      grid.appendChild(el("div", "wd" + (i === 0 ? " sun" : i === 6 ? " sat" : ""), w));
    });
    for (var i = 0; i < first.getDay(); i++) grid.appendChild(el("div", "cell empty"));

    for (var day = 1; day <= lastDate; day++) {
      var d = new Date(state.year, state.month, day);
      var key = ymd(d);
      var cell = el("div", "cell");
      if (d.getDay() === 0) cell.classList.add("sun");
      if (d.getDay() === 6) cell.classList.add("sat");
      if (key === todayStr) cell.classList.add("today");
      cell.appendChild(el("span", "num", day));

      var list = (byDate[key] || []).slice().sort(function (a, b) {
        if (a.type !== b.type) return a.type === "close" ? -1 : 1;
        return (b.ev.pick ? 1 : 0) - (a.ev.pick ? 1 : 0);  // ⭐ 추천 먼저
      });
      list.slice(0, MAX_CHIPS).forEach(function (it) { cell.appendChild(chip(it, true)); });
      if (list.length > MAX_CHIPS) cell.appendChild(el("span", "more", "+" + (list.length - MAX_CHIPS) + "개 더"));

      // 일정이 있는 날(또는 장기 행사가 열리는 날)은 칸 전체를 눌러 그날 일정을 크게 본다
      var longs = kind === "event" ? longOn(events, key) : [];
      if (list.length || longs.length) {
        cell.classList.add("has-items");
        cell.tabIndex = 0;
        cell.setAttribute("role", "button");
        cell.setAttribute("aria-label", fmt(key) + " 일정 " + (list.length + longs.length) + "개 보기");
        var open = (function (k, l, lg) { return function () { openDay(k, l, lg, kind); }; })(key, list, longs);
        cell.addEventListener("click", open);
        cell.addEventListener("keydown", (function (fn) {
          return function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };
        })(open));
      }
      grid.appendChild(cell);
    }
    container.appendChild(grid);
  }

  function renderAgenda(ul, items, kind) {
    var prefix = state.year + "-" + pad(state.month + 1);
    var monthItems = items.filter(function (it) { return it.date.indexOf(prefix) === 0; });
    if (kind === "event") monthItems = monthItems.filter(function (it) {
      return it.isStart || it.date === prefix + "-01";
    });
    monthItems.sort(function (a, b) {
      if (!!a.long !== !!b.long) return a.long ? 1 : -1;  // 장기 행사는 목록 맨 아래
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });

    ul.innerHTML = "";
    if (!monthItems.length) {
      ul.appendChild(el("li", "empty-note", kind === "event" ? "이 달에 등록된 행사가 없어요." : "이 달에 신청 일정이 없어요."));
      return;
    }
    monthItems.forEach(function (it) {
      var li = el("li", "agenda-item");
      li.dataset.id = it.ev.id;
      li.style.setProperty("--c", cat(it.ev).color);
      var when = el("span", "when", kind === "event" ? fmtRange(it.ev)
        : fmt(it.type === "open" ? it.ev.applyStart : it.ev.applyEnd));
      var what = el("button", "what", (it.ev.pick ? "⭐ " : "") + name(it.ev));
      if (area(it.ev)) what.appendChild(el("small", "area", area(it.ev)));
      what.type = "button";
      what.addEventListener("click", function () { openDetail(it.ev); });
      li.appendChild(when);
      li.appendChild(what);
      if (kind === "deadline") {
        var tag = el("span", "tag tag-" + it.type, it.type === "open" ? "신청 오픈" : dday(it.ev.applyEnd));
        if (it.type === "close" && parseDate(it.date) < today()) tag.classList.add("past");
        li.appendChild(tag);
      } else {
        li.appendChild(el("span", "tag tag-cat", cat(it.ev).label));
      }
      ul.appendChild(li);
    });
  }

  function renderLong(box, events) {
    var list = events.filter(function (ev) { return isLong(ev) && overlapsMonth(ev); });
    box.innerHTML = "";
    box.hidden = !list.length;
    if (!list.length) return;
    box.appendChild(el("span", "long-title", "이달 내내 열리는 행사"));
    list.forEach(function (ev) {
      var c = chip({ ev: ev, type: "event", date: ev.end, label: (ev.pick ? "⭐ " : "") + name(ev) + " · ~" + fmt(ev.end) });
      c.classList.add("chip-long");
      box.appendChild(c);
    });
  }

  function renderFilters() {
    var box = $("filters");
    box.innerHTML = "";
    Object.keys(CATS).forEach(function (k) {
      var b = el("button", "filter" + (state.hidden[k] ? " off" : ""), CATS[k].label);
      b.type = "button";
      b.style.setProperty("--c", CATS[k].color);
      b.setAttribute("aria-pressed", String(!state.hidden[k]));
      b.addEventListener("click", function () { state.hidden[k] = !state.hidden[k]; render(); });
      box.appendChild(b);
    });
  }

  function renderHeader() {
    var sel = $("region-select");
    if (!sel.options.length) {
      Object.keys(REGIONS).forEach(function (k) {
        var o = el("option", null, REGIONS[k].name);
        o.value = k;
        sel.appendChild(o);
      });
      sel.addEventListener("change", function () { location.hash = hashFor(sel.value, state.year, state.month); });
    }
    sel.value = state.region;
    var rname = REGIONS[state.region].name;
    $("month-title").textContent = rname + " · " + state.year + "년 " + (state.month + 1) + "월";
    $("updated").textContent = DATA.updatedAt ? "정보 업데이트: " + DATA.updatedAt + " · 행사 " + DATA.events.length + "개" : "아직 등록된 행사가 없어요.";
    document.title = rname + " " + state.year + "년 " + (state.month + 1) + "월 나들이 플래너";
    $("prev-month").href = hashFor(state.region, state.year, state.month - 1);
    $("next-month").href = hashFor(state.region, state.year, state.month + 1);
    $("today-btn").href = hashFor(state.region, today().getFullYear(), today().getMonth());
  }

  function render() {
    parseHash();
    renderHeader();
    renderFilters();
    var events = visibleEvents();
    var evItems = eventItems(events);
    var dlItems = deadlineItems(events);
    renderWeekend($("weekend"), events);
    renderLong($("long-event"), events);
    renderCalendar($("cal-event"), evItems, "event", events);
    renderCalendar($("cal-deadline"), dlItems, "deadline", events);
    renderAgenda($("list-event"), evItems.concat(events.filter(function (ev) {
      return isLong(ev) && overlapsMonth(ev);
    }).map(function (ev) {
      return { date: state.year + "-" + pad(state.month + 1) + "-01", ev: ev, type: "event", isStart: true, long: true };
    })), "event");
    renderAgenda($("list-deadline"), dlItems, "deadline");
  }

  /* ---------- 상세 보기 ---------- */
  function row(dl, k, v) {
    if (!v) return;
    dl.appendChild(el("dt", null, k));
    dl.appendChild(el("dd", null, v));
  }

  function openDetail(ev, back) {
    var body = $("detail-body");
    body.innerHTML = "";
    if (back) {
      var b = el("button", "back", "‹ " + back.label);
      b.type = "button";
      b.addEventListener("click", back.fn);
      body.appendChild(b);
    }
    var badge = el("span", "tag tag-cat", cat(ev).label);
    badge.style.setProperty("--c", cat(ev).color);
    body.appendChild(badge);
    if (ev.pick) body.appendChild(el("span", "tag tag-pick", "⭐ 이번 주말 추천"));
    body.appendChild(el("h3", null, ev.title));
    if (ev.summary) body.appendChild(el("p", "summary", ev.summary));
    var dl = el("dl", "info");
    row(dl, "행사 일정", fmtRange(ev));
    row(dl, "시간", ev.time);
    row(dl, "장소", [area(ev), ev.place].filter(Boolean).join(" · "));
    row(dl, "대상", ev.age);
    row(dl, "비용", ev.price);
    if (ev.applyStart || ev.applyEnd) {
      row(dl, "신청 기간", (ev.applyStart ? fmt(ev.applyStart) : "") + " ~ " + (ev.applyEnd ? fmt(ev.applyEnd) + " (" + dday(ev.applyEnd) + ")" : ""));
    } else {
      row(dl, "신청", "사전 신청 없음");
    }
    row(dl, "신청 방법", ev.applyHow);
    row(dl, "메모", ev.note);
    row(dl, "확인일", ev.checkedAt);
    body.appendChild(dl);
    if (ev.url) {
      var a = el("a", "link", "공식 안내 보기 ↗");
      a.href = ev.url; a.target = "_blank"; a.rel = "noopener";
      body.appendChild(a);
    }
    body.appendChild(relatedLinks(ev));
    showDialog();
  }

  // 상세 창 하단: 블로그 후기·공지 등 관련 글 (최대 3개) + 네이버 검색 바로가기
  var LINK_KIND = { review: "후기", notice: "공지", news: "기사", info: "소개" };
  function searchQuery(ev) {
    return name(ev).replace(/\s*-\s*[^-]+$/, "").replace(/[<>〈〉\[\]「」《》()]/g, " ").replace(/\s+/g, " ").trim();
  }
  function relatedLinks(ev) {
    var box = el("section", "related");
    box.appendChild(el("h4", null, "관련 글"));
    var links = (ev.links || []).slice(0, 3);
    if (links.length) {
      var ul = el("ul", "related-list");
      links.forEach(function (l) {
        var li = el("li");
        var a = el("a", "related-item");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer";
        var top = el("span", "ri-top");
        if (l.kind && LINK_KIND[l.kind]) top.appendChild(el("span", "ri-kind ri-" + l.kind, LINK_KIND[l.kind]));
        top.appendChild(el("span", "ri-source", [l.source, l.date].filter(Boolean).join(" · ")));
        a.appendChild(top);
        a.appendChild(el("span", "ri-title", l.title));
        li.appendChild(a);
        ul.appendChild(li);
      });
      box.appendChild(ul);
    } else {
      box.appendChild(el("p", "related-empty", "아직 모아 둔 글이 없어요."));
    }
    var q = searchQuery(ev);
    var more = el("div", "related-more");
    [["네이버 블로그 후기", "https://search.naver.com/search.naver?ssc=tab.blog.all&query=" + encodeURIComponent(q + " 후기")],
     ["네이버 검색", "https://search.naver.com/search.naver?query=" + encodeURIComponent(q)]].forEach(function (x) {
      var a = el("a", null, x[0] + " ↗");
      a.href = x[1]; a.target = "_blank"; a.rel = "noopener noreferrer";
      more.appendChild(a);
    });
    box.appendChild(more);
    return box;
  }

  function openDay(key, list, longs, kind) {
    var body = $("detail-body");
    body.innerHTML = "";
    var reopen = { label: fmt(key) + " 일정으로", fn: function () { openDay(key, list, longs, kind); } };
    var total = list.length + longs.length;
    body.appendChild(el("p", "day-kicker", kind === "deadline" ? "예약·신청 일정" : "나들이 행사"));
    body.appendChild(el("h3", "day-title", fmt(key) + " · " + total + "개"));

    var wrap = el("div", "day-list");
    list.forEach(function (it) { wrap.appendChild(dayCard(it, kind, reopen)); });
    body.appendChild(wrap);

    if (longs.length) {
      body.appendChild(el("p", "day-sub", "이날도 열리는 장기·상시 행사"));
      var w2 = el("div", "day-list");
      longs.forEach(function (ev) { w2.appendChild(dayCard({ ev: ev, type: "event", date: key }, "event", reopen)); });
      body.appendChild(w2);
    }
    showDialog();
  }

  // 날짜 창 안의 큰 카드
  function dayCard(it, kind, back) {
    var ev = it.ev;
    var card = el("button", "day-card");
    card.type = "button";
    card.style.setProperty("--c", cat(ev).color);
    card.dataset.id = ev.id;

    var top = el("div", "dc-top");
    var badge = el("span", "tag tag-cat", cat(ev).label);
    top.appendChild(badge);
    if (ev.pick) top.appendChild(el("span", "tag tag-pick", "⭐ 추천"));
    if (kind === "deadline") {
      var isOpen = it.type === "open";
      var t = el("span", "tag " + (isOpen ? "tag-open" : "tag-close"), isOpen ? "신청 오픈" : "신청 마감 " + dday(ev.applyEnd));
      if (!isOpen && parseDate(ev.applyEnd) < today()) t.classList.add("past");
      top.appendChild(t);
    }
    card.appendChild(top);
    card.appendChild(el("strong", "dc-title", name(ev)));

    var meta = [];
    if (kind === "deadline") {
      meta.push((it.type === "open" ? "신청 시작 " + fmt(ev.applyStart) : "신청 마감 " + fmt(ev.applyEnd)));
      meta.push("행사 " + fmtRange(ev));
    } else {
      meta.push(fmtRange(ev) + (ev.time ? " · " + ev.time : ""));
    }
    meta.push([area(ev), ev.place].filter(Boolean).join(" · "));
    if (ev.age || ev.price) meta.push([ev.age, ev.price].filter(Boolean).join(" · "));
    meta.forEach(function (m) { if (m) card.appendChild(el("span", "dc-meta", m)); });
    if (ev.summary) card.appendChild(el("span", "dc-summary", ev.summary));
    card.appendChild(el("span", "dc-more", "자세히 보기 ›"));
    card.addEventListener("click", function () { openDetail(ev, back); });
    return card;
  }

  /* ---------- 다음 주말 추천 5 ---------- */
  var WEEKEND_PICKS = 5;

  // 평일이면 다가오는 토·일, 토요일이면 이번 주말, 일요일이면 다음 주말(일요일 아침에 데이터가 갱신되므로)
  function nextWeekend() {
    var t = today();
    var add = t.getDay() === 0 ? 6 : 6 - t.getDay();
    var sat = new Date(t); sat.setDate(t.getDate() + add);
    var sun = new Date(sat); sun.setDate(sat.getDate() + 1);
    return { sat: ymd(sat), sun: ymd(sun) };
  }

  function weekendScore(ev) {
    return (ev.pick ? 100 : 0) + (isLong(ev) ? 0 : 20) + (ev.near ? 10 : 0) + (ev.summary ? 1 : 0);
  }

  // 추천(pick) 우선, 그다음 분야가 겹치지 않게 고르고, 남는 자리는 점수순으로 채운다
  function pickWeekend(events, wk) {
    var cands = events.filter(function (ev) { return covers(ev, wk.sat) || covers(ev, wk.sun); })
      .sort(function (a, b) { return weekendScore(b) - weekendScore(a) || (a.start < b.start ? -1 : 1); });
    var chosen = [], usedCat = {};
    cands.forEach(function (ev) {
      if (chosen.length < WEEKEND_PICKS && (ev.pick || !usedCat[ev.category])) { chosen.push(ev); usedCat[ev.category] = true; }
    });
    cands.forEach(function (ev) {
      if (chosen.length < WEEKEND_PICKS && chosen.indexOf(ev) < 0) chosen.push(ev);
    });
    return { list: chosen.sort(function (a, b) { return weekendScore(b) - weekendScore(a); }), total: cands.length };
  }

  function whichDays(ev, wk) {
    var s = covers(ev, wk.sat), u = covers(ev, wk.sun);
    return s && u ? "토·일" : s ? "토요일" : "일요일";
  }

  function renderWeekend(box, events) {
    var wk = nextWeekend();
    var r = pickWeekend(events, wk);
    box.innerHTML = "";
    var head = el("div", "wk-head");
    head.appendChild(el("h2", null, "🌟 다음 주말 추천"));
    var sat = parseDate(wk.sat), sun = parseDate(wk.sun);
    head.appendChild(el("span", "wk-date", (sat.getMonth() + 1) + "/" + sat.getDate() + "(토) ~ " + (sun.getMonth() + 1) + "/" + sun.getDate() + "(일)"));
    if (r.total > r.list.length) head.appendChild(el("span", "wk-count", "후보 " + r.total + "개 중 " + r.list.length + "개"));
    box.appendChild(head);

    if (!r.list.length) {
      box.appendChild(el("p", "empty-note", "아직 다음 주말 행사 정보가 없어요. 일요일 아침에 새로 채워집니다."));
      return;
    }
    var row = el("div", "wk-list");
    r.list.forEach(function (ev, i) {
      var card = el("button", "wk-card" + (ev.pick ? " is-pick" : ""));
      card.type = "button";
      card.dataset.id = ev.id;
      card.style.setProperty("--c", cat(ev).color);
      var top = el("div", "dc-top");
      top.appendChild(el("span", "wk-rank", String(i + 1)));
      top.appendChild(el("span", "tag tag-cat", cat(ev).label));
      if (ev.pick) top.appendChild(el("span", "tag tag-pick", "⭐ 강력 추천"));
      card.appendChild(top);
      card.appendChild(el("strong", "dc-title", name(ev)));
      card.appendChild(el("span", "wk-when", whichDays(ev, wk) + (ev.time ? " · " + ev.time : "")));
      card.appendChild(el("span", "dc-meta", [area(ev), ev.place].filter(Boolean).join(" · ")));
      if (ev.price) card.appendChild(el("span", "dc-meta", ev.price));
      if (ev.summary) card.appendChild(el("span", "dc-summary", ev.summary));
      card.addEventListener("click", function () { openDetail(ev); });
      row.appendChild(card);
    });
    box.appendChild(row);
  }

  function showDialog() {
    var d = $("detail");
    if (d.open) d.close();
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  $("detail").addEventListener("click", function (e) { if (e.target === this) this.close(); });

  /* ---------- 두 달력 사이 연결 하이라이트 ---------- */
  function setHighlight(id) {
    document.querySelectorAll(".hl").forEach(function (n) { n.classList.remove("hl"); });
    if (!id) return;
    document.querySelectorAll('[data-id="' + id + '"]').forEach(function (n) { n.classList.add("hl"); });
  }
  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest && e.target.closest("[data-id]");
    setHighlight(t ? t.dataset.id : null);
  });

  window.addEventListener("hashchange", render);
  render();
})();
