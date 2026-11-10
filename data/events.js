/*
 * 나들이 행사 데이터
 *
 * 지역(region) 별로 행사 목록을 관리합니다.
 * 각 행사 필드:
 *   id          고유 ID (문자열)
 *   title       행사명
 *   category    분류 키 (아래 CATEGORIES 참고)
 *   place       장소
 *   start, end  행사 기간 (YYYY-MM-DD, 하루 행사면 end 생략 가능)
 *   time        운영 시간 (선택)
 *   age         대상 연령 (선택)
 *   price       비용 (선택)
 *   applyStart  예약·신청 시작일 (선택, YYYY-MM-DD 또는 YYYY-MM-DDTHH:mm)
 *   applyEnd    예약·신청 마감일 (선택, 있으면 오른쪽 달력에 표시)
 *   applyHow    신청 방법 (선택)
 *   url         공식 안내 링크 (선택)
 *   note        메모 (선택)
 *
 * ※ 아래는 화면 구성을 보여주기 위한 예시 데이터입니다. 실제 행사 정보로 바꿔 사용하세요.
 */
window.NADRI_DATA = {
  categories: {
    festival:   { label: "축제",       color: "#f2994a" },
    experience: { label: "체험·교육",  color: "#2f9e8f" },
    show:       { label: "공연·전시",  color: "#8e6bd8" },
    nature:     { label: "자연·숲",    color: "#4caf50" },
    sports:     { label: "체육·놀이",  color: "#3d7be0" }
  },
  regions: {
    seongnam: {
      name: "성남",
      events: [
        {
          id: "sn-001", title: "[예시] 가을 숲 유아 생태체험", category: "nature",
          place: "율동공원 일대", start: "2026-11-07", end: "2026-11-08", time: "10:00–12:00",
          age: "5–7세", price: "무료", applyStart: "2026-10-27", applyEnd: "2026-11-03",
          applyHow: "온라인 사전 신청(선착순)", url: ""
        },
        {
          id: "sn-002", title: "[예시] 어린이 인형극 공연", category: "show",
          place: "시민회관 소극장", start: "2026-11-14", time: "11:00, 14:00",
          age: "4세 이상", price: "5,000원", applyStart: "2026-11-02T10:00", applyEnd: "2026-11-12",
          applyHow: "온라인 예매"
        },
        {
          id: "sn-003", title: "[예시] 가족 김장 체험 한마당", category: "experience",
          place: "농업기술센터", start: "2026-11-21", time: "10:00–15:00",
          age: "가족 단위", price: "가구당 10,000원", applyStart: "2026-11-09", applyEnd: "2026-11-16",
          applyHow: "전화 접수 후 추첨", note: "추첨 결과는 11/18 문자 안내"
        },
        {
          id: "sn-004", title: "[예시] 탄천 가을 축제", category: "festival",
          place: "탄천 둔치", start: "2026-11-13", end: "2026-11-15", time: "11:00–20:00",
          age: "전 연령", price: "무료", note: "별도 신청 없이 현장 참여"
        },
        {
          id: "sn-005", title: "[예시] 어린이 과학 탐구 교실", category: "experience",
          place: "청소년수련관", start: "2026-11-28", time: "13:00–15:00",
          age: "초등 1–3학년", price: "3,000원", applyStart: "2026-11-17", applyEnd: "2026-11-24",
          applyHow: "온라인 선착순"
        },
        {
          id: "sn-006", title: "[예시] 그림책 원화 전시", category: "show",
          place: "중앙도서관 전시실", start: "2026-11-03", end: "2026-11-29", time: "09:00–18:00 (월 휴관)",
          age: "전 연령", price: "무료"
        },
        {
          id: "sn-007", title: "[예시] 키즈 실내 운동회", category: "sports",
          place: "종합운동장 실내체육관", start: "2026-11-22", time: "10:00–13:00",
          age: "6–9세", price: "무료", applyStart: "2026-11-10", applyEnd: "2026-11-19",
          applyHow: "온라인 선착순 200명"
        },
        {
          id: "sn-008", title: "[예시] 겨울방학 어린이 캠프", category: "experience",
          place: "청소년수련원", start: "2027-01-07", end: "2027-01-09",
          age: "초등 4–6학년", price: "50,000원", applyStart: "2026-11-25", applyEnd: "2026-12-05",
          applyHow: "온라인 신청 후 추첨"
        },
        {
          id: "sn-009", title: "[예시] 크리스마스 가족 음악회", category: "show",
          place: "아트센터 콘서트홀", start: "2026-12-19", time: "15:00",
          age: "5세 이상", price: "10,000원", applyStart: "2026-11-30T14:00", applyEnd: "2026-12-15",
          applyHow: "온라인 예매"
        },
        {
          id: "sn-010", title: "[예시] 숲속 유치원 체험의 날", category: "nature",
          place: "남한산성 숲체험장", start: "2026-12-05", time: "10:00–12:00",
          age: "4–7세", price: "무료", applyStart: "2026-11-20", applyEnd: "2026-11-27",
          applyHow: "온라인 선착순"
        }
      ]
    }
  }
};
