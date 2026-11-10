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

  function chip(it) {
    var c = el("button", "chip chip-" + it.type, it.label);
    var color = cat(it.ev).color;
    c.type = "button";
    c.style.setProperty("--c", color);
    c.dataset.id = it.ev.id;
    c.title = it.ev.title;
    if (it.type === "close" && parseDate(it.date) < today()) c.classList.add("past");
    if (it.type === "event" && parseDate(it.ev.end || it.ev.start) < today()) c.classList.add("past");
    c.addEventListener("click", function () { openDetail(it.ev); });
    return c;
  }

  function renderCalendar(container, items) {
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
      list.slice(0, MAX_CHIPS).forEach(function (it) { cell.appendChild(chip(it)); });
      if (list.length > MAX_CHIPS) {
        var more = el("button", "more", "+" + (list.length - MAX_CHIPS) + "개 더");
        more.type = "button";
        more.addEventListener("click", (function (l, k) {
          return function () { openDay(k, l); };
        })(list, key));
        cell.appendChild(more);
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
    renderLong($("long-event"), events);
    renderCalendar($("cal-event"), evItems);
    renderCalendar($("cal-deadline"), dlItems);
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

  function openDetail(ev) {
    var body = $("detail-body");
    body.innerHTML = "";
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
    showDialog();
  }

  function openDay(key, list) {
    var body = $("detail-body");
    body.innerHTML = "";
    body.appendChild(el("h3", null, fmt(key) + " 일정"));
    var wrap = el("div", "day-list");
    list.forEach(function (it) { wrap.appendChild(chip(it)); });
    body.appendChild(wrap);
    showDialog();
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
