/*
 * 나들이 플래너 설정: 분류(category)와 지역 필터(region)
 * 행사 데이터는 data/events.js 에 있습니다.
 */
window.NADRI_CONFIG = {
  categories: {
    show:       { label: "공연",          color: "#8e6bd8" },
    exhibit:    { label: "전시",          color: "#d16ba5" },
    festival:   { label: "축제",          color: "#f2994a" },
    experience: { label: "체험·교육",     color: "#2f9e8f" },
    family:     { label: "어린이·가족",   color: "#e5b52e" },
    local:      { label: "지역 행사",     color: "#4caf50" },
    science:    { label: "과학·AI·로봇",  color: "#3d7be0" }
  },
  // URL: #/{region}/events/{YYYY-MM}
  regions: {
    sudogwon: { name: "수도권",       match: function () { return true; } },
    seoul:    { name: "서울",         match: function (ev) { return ev.sido === "서울"; } },
    gyeonggi: { name: "경기",         match: function (ev) { return ev.sido === "경기"; } },
    incheon:  { name: "인천",         match: function (ev) { return ev.sido === "인천"; } },
    seongnam: { name: "성남·분당 인근", match: function (ev) { return !!ev.near; } }
  },
  defaultRegion: "sudogwon"
};
