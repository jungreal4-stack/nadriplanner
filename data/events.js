/*
 * 나들이 행사 데이터 (매주 일요일 자동 업데이트 루틴이 이 파일을 갱신합니다)
 *
 * 필드:
 *   id          고유 ID. 형식: "YYYYMMDD-짧은영문슬러그" (행사 시작일 기준, 예: "20261114-songpa-puppet")
 *   title       행사명 (공식 명칭)
 *   category    분류 키: show | exhibit | festival | experience | family | local | science
 *   sido        "서울" | "경기" | "인천"
 *   city        시·구 (예: "성남시 분당구", "송파구", "수원시")
 *   near        성남·분당 인근(성남, 용인, 수원, 과천, 서울 강남·송파·서초 등)이면 true
 *   place       장소
 *   start, end  행사 기간 (YYYY-MM-DD, 하루 행사면 end 생략)
 *   time        운영 시간 (선택)
 *   age         대상 연령 (선택)
 *   price       비용 (선택)
 *   applyStart  예약·신청 시작 (선택, YYYY-MM-DD 또는 YYYY-MM-DDTHH:mm)
 *   applyEnd    예약·신청 마감 (선택, 있으면 오른쪽 달력에 표시)
 *   applyHow    신청 방법 (선택)
 *   summary     무슨 행사인지, 아이와 가족이 실제로 무엇을 하는지 1~2문장
 *   pick        그 주말 가장 추천하는 행사면 true (선택)
 *   url         공식 안내 링크 (확인된 개별 링크)
 *   checkedAt   정보를 확인한 날짜 (YYYY-MM-DD)
 */
window.NADRI_EVENTS = {
  updatedAt: "",
  events: []
};
