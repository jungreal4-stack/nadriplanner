#!/usr/bin/env node
// data/events.js 형식 검사: node scripts/validate.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data/config.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data/events.js"), "utf8"), ctx);

const cats = Object.keys(ctx.window.NADRI_CONFIG.categories);
const data = ctx.window.NADRI_EVENTS;
const errors = [];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/;
const ids = new Set();

if (!data || !Array.isArray(data.events)) errors.push("window.NADRI_EVENTS.events 배열이 없습니다");
if (data && data.updatedAt && !DATE.test(data.updatedAt)) errors.push("updatedAt 형식 오류");

(data.events || []).forEach((ev, i) => {
  const at = `#${i} ${ev.id || "(id 없음)"}`;
  for (const k of ["id", "title", "category", "sido", "place", "start"]) if (!ev[k]) errors.push(`${at}: ${k} 누락`);
  if (ids.has(ev.id)) errors.push(`${at}: id 중복`);
  ids.add(ev.id);
  if (ev.category && !cats.includes(ev.category)) errors.push(`${at}: 알 수 없는 category "${ev.category}"`);
  if (ev.sido && !["서울", "경기", "인천"].includes(ev.sido)) errors.push(`${at}: sido는 서울/경기/인천`);
  for (const k of ["start", "end", "checkedAt"]) if (ev[k] && !DATE.test(ev[k])) errors.push(`${at}: ${k} 날짜 형식 오류`);
  for (const k of ["applyStart", "applyEnd"]) if (ev[k] && !DATETIME.test(ev[k])) errors.push(`${at}: ${k} 날짜 형식 오류`);
  if (ev.end && ev.start && ev.end < ev.start) errors.push(`${at}: end가 start보다 빠름`);
  if (ev.applyStart && ev.applyEnd && ev.applyEnd.slice(0, 10) < ev.applyStart.slice(0, 10)) errors.push(`${at}: applyEnd가 applyStart보다 빠름`);
  if (ev.links !== undefined) {
    if (!Array.isArray(ev.links)) errors.push(`${at}: links는 배열이어야 합니다`);
    else {
      if (ev.links.length > 3) errors.push(`${at}: links는 최대 3개`);
      ev.links.forEach((l, j) => {
        if (!l || !l.title || !l.url) errors.push(`${at}: links[${j}] title/url 누락`);
        else if (!/^https:\/\//.test(l.url)) errors.push(`${at}: links[${j}] url은 https://로 시작해야 합니다`);
        if (l && l.kind && !["review", "notice", "news", "info"].includes(l.kind)) errors.push(`${at}: links[${j}] kind는 review/notice/news/info`);
        if (l && l.date && !DATE.test(l.date)) errors.push(`${at}: links[${j}] date 형식 오류`);
        if (l && l.url && l.url === ev.url) errors.push(`${at}: links[${j}]가 공식 url과 같습니다`);
      });
    }
  }
  if (ev.category === "science" && !ev.near) errors.push(`${at}: 과학 행사는 성남·분당 인근(near: true)만 넣습니다`);
});

if (errors.length) {
  console.error("데이터 오류 " + errors.length + "건:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: 행사 ${data.events.length}개, 업데이트 ${data.updatedAt || "(없음)"}`);
