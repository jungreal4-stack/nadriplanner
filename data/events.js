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
  updatedAt: "2026-11-10",
  events: [
    {
      id: "20260524-gcm-pizza",
      title: "경기도어린이박물관 상설 프로그램 <조각-조각 함께요! 피자요!>",
      category: "experience",
      sido: "경기", city: "용인시 기흥구", near: true,
      place: "경기도어린이박물관 3층 <모두의 식탁>",
      start: "2026-05-24", end: "2026-12-31",
      time: "주말·공휴일 11:00, 15:00 (회차당 30분)",
      age: "5세 이상 어린이(회차별 12명), 보호자 1인 동반 가능",
      price: "무료 (박물관 입장 예약 필요)",
      applyHow: "지지씨 멤버스 사전 예약. 같은 날짜·회차 박물관 입장권을 먼저 예매해야 함",
      summary: "미래의 피자 재료를 상상해 자투리 천·종이·스티커로 피자 조각 상자를 꾸미고, 친구들 조각과 이어 '피자 생태계'를 만들며 자원 순환을 배운다.",
      url: "https://gcm.ggcf.kr/edus/785",
      checkedAt: "2026-11-10"
    },
    {
      id: "20260927-gcm-family-voice",
      title: "[주말가족] 너의 목소리가 들려",
      category: "family",
      sido: "경기", city: "용인시 기흥구", near: true,
      place: "경기도어린이박물관 2층 교육실 1",
      start: "2026-09-27", end: "2026-12-13",
      time: "매주 일요일 1회차 11:00(만 4~6세), 2회차 15:00(만 7~9세), 50분",
      age: "어린이 동반 가족, 2회차 만 7~9세 권장 (보호자 1+어린이 1이 한 팀, 회차당 6팀)",
      price: "팀당 2,000원 (입장권 별도)",
      applyEnd: "2026-12-12",
      applyHow: "지지씨 멤버스 사전 예약. 각 회차 30일 전부터 1일 전까지 신청(마지막 12/13 회차는 12/12까지). 입장권 먼저 예약",
      summary: "가족이 대화하며 '귀 기울여 듣기'를 몸으로 체험하고 함께 가족 카드를 만드는 전시 연계 교육. 남은 회차는 11/15, 11/22, 11/29, 12/6, 12/13.",
      url: "https://gcm.ggcf.kr/edus/800",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261020-namm-chantak",
      title: "2026 국립농업박물관 테마전 <따스하게 달그락>",
      category: "exhibit",
      sido: "경기", city: "수원시 권선구", near: true,
      place: "국립농업박물관 전시동 중앙홀",
      start: "2026-10-20", end: "2026-12-13",
      time: "화~일 10:00~18:00 (17:00 입장 마감)",
      price: "무료",
      summary: "옛 부엌에서 음식과 그릇을 보관하던 가구 '찬탁'의 쓰임과 역사를 보여 주고, 작가가 이를 새롭게 해석한 가구 작품도 함께 전시한다. 아이 전용 체험은 안내되어 있지 않다.",
      url: "https://www.swcf.or.kr/?p=29_view&idx=3075",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261113-toy-music-festival",
      title: "제7회 장난감 음악제",
      category: "festival",
      sido: "서울", city: "서초구", near: true,
      place: "샤론아트홀(13일), 더샵갤러리(14~15일)",
      start: "2026-11-13", end: "2026-11-15",
      time: "13일 19:30 / 14·15일 로비 음악회 15:00, 본공연 16:30",
      age: "누구나 (15일 16:30은 어린이·가족 대상)",
      price: "13일 2만 원, 14일 3만 원, 15일 2만 원",
      summary: "장난감 악기와 토이피아노로 꾸미는 음악 축제. 15일(일)에는 어린이·가족 대상 키즈컬 「플라스틱 나라」와 워크숍이 열린다.",
      url: "https://sites.google.com/view/toymusicfestival/2026-festival",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261114-tightrope-child",
      title: "창작연희극 <줄 타는 아이와 아프리카도마뱀>",
      category: "show",
      sido: "경기", city: "수원시 권선구", near: true,
      place: "수원문화원 빛누리아트홀",
      start: "2026-11-14",
      time: "14:00~15:00",
      age: "초등학생 이상",
      price: "전석 10,000원",
      applyHow: "NOL티켓(인터파크) 예매",
      summary: "부모를 찾아 아프리카도마뱀과 환상 여행을 떠나는 아이 이야기를 전통 줄타기, 음악, 춤, 재담으로 풀어낸 가족 공연. 눈앞에서 줄타기 묘기를 볼 수 있다.",
      pick: true,
      url: "https://www.swcf.or.kr/?p=29_view&idx=3072",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261114-dorimcheon-eco-festa",
      title: "제2회 별빛내린 도림천 생태공예문화 페스타",
      category: "festival",
      sido: "서울", city: "구로구", near: false,
      place: "안양천 생태초화원 잔디광장 일대 (도림천역·신도림역)",
      start: "2026-11-14", end: "2026-11-15",
      time: "11:00~19:00",
      age: "누구나, 가족 단위 환영",
      price: "무료 (체험 키트는 오전 선착순 하루 250명)",
      summary: "하천 생태를 주제로 한 야외 축제. 아이들은 한지 생태지도 만들기, 수질 측정, 생태해설 투어, 공예 부스를 체험하고, 15일에는 가족 생태음악극 《물의 기억》을 본다.",
      pick: true,
      url: "https://festival.seoul.go.kr/festival/main/festivalView.do?festacode=977",
      note: "전용 주차장 없음, 대중교통 권장",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261114-gcart-photo-reporter",
      title: "과천문화재단 문화예술 아카데미 <찰칵찰칵! 사진기자단>",
      category: "experience",
      sido: "경기", city: "과천시", near: true,
      place: "과천시민회관 예술강좌실3",
      start: "2026-11-14", end: "2026-12-12",
      time: "매주 토 10:00~11:00 (총 5회)",
      age: "초1~4 (비고란에는 초3~4로 표기, 신청 전 확인 필요)",
      price: "100,000원 (재료비 포함)",
      applyStart: "2026-11-05T16:00",
      applyEnd: "2026-11-13T17:00",
      applyHow: "과천문화재단 홈페이지 수강신청, 선착순 10명 (마감 후 대기는 02-2009-9700)",
      summary: "어린이가 스마트폰을 들고 사진기자처럼 취재·촬영해 보는 5주 단기 강좌. 촬영용 스마트폰(공기계 가능)이 필요하다.",
      url: "https://www.gcart.or.kr/kr/academy/familyAcaView.do?acaIdx=384",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261114-takipoo-incheon",
      title: "뮤지컬 타키포오 [몬스터 전쟁의 서막 ; 더 좀비]",
      category: "show",
      sido: "인천", city: "남동구", near: false,
      place: "남동소래아트홀 대공연장",
      start: "2026-11-14", end: "2026-11-15",
      time: "14일 11:00·14:00·16:00 / 15일 11:00·14:00 (70분)",
      age: "24개월 이상",
      price: "R석 70,000원, S석 60,000원 (할인가 별도)",
      applyHow: "NOL티켓 등 예매처 사전 예매. 당일 예매분은 취소·환불 불가",
      summary: "유튜브 캐릭온TV 캐릭터들이 나오는 몬스터 세계 전쟁 이야기의 캐릭터 뮤지컬. 아이가 좋아하는 캐릭터를 무대에서 직접 본다.",
      url: "https://nol.yanolja.com/ticket/products/26011601",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261114-under-the-sea-suwon",
      title: "송승환의 가족뮤지컬 〈더 스토리 오브 언더더씨〉 - 수원",
      category: "show",
      sido: "경기", city: "수원시 팔달구", near: true,
      place: "경기아트센터 대극장",
      start: "2026-11-14", end: "2026-11-15",
      time: "14일 11:00·14:00·16:30 / 15일 11:00·14:00 (80분)",
      age: "24개월 이상",
      price: "R석 77,000원, S석 55,000원",
      applyHow: "NOL티켓 예매",
      summary: "바닷속 세계를 배경으로 한 대극장 가족 뮤지컬. 큰 무대에서 노래와 춤이 어우러진 공연을 온 가족이 함께 본다.",
      url: "https://nol.yanolja.com/ticket/products/26007683",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261115-childrenpark-taekwondo",
      title: "서울어린이대공원 명성태권도 시범단 공연",
      category: "local",
      sido: "서울", city: "광진구", near: false,
      place: "서울어린이대공원 열린무대",
      start: "2026-11-15",
      time: "14:00~17:00",
      summary: "어린이대공원 야외 열린무대에서 열리는 태권도 시범 공연. 공원 산책과 놀이터 나들이에 곁들여 보기 좋다.",
      url: "https://www.sisul.or.kr/open_content/sub/schedule/detail.do?year=2026&month=11&day=15&site_div=childrenpark",
      checkedAt: "2026-11-10"
    },
    {
      id: "20261121-apple-kung-seongnam",
      title: "2026 베스트셀러 뮤지컬 〈사과가 쿵!〉 - 성남",
      category: "show",
      sido: "경기", city: "성남시 분당구", near: true,
      place: "성남아트센터 앙상블시어터",
      start: "2026-11-21", end: "2026-11-22",
      time: "11:00, 14:00, 16:30 (55분)",
      age: "24개월 이상, 성인 보호자 동반 필수",
      price: "전석 40,000원 (할인가 별도)",
      applyHow: "NOL티켓 예매, 관람 2시간 전까지",
      summary: "그림책 『사과가 쿵!』을 옮긴 어린이 라이브 뮤지컬. 커다란 사과를 두고 동물 친구들이 모이는 이야기를 노래와 함께 본다. 집 가까운 곳이라 다음 주 나들이로 좋다.",
      url: "https://nol.yanolja.com/ticket/products/26013058",
      checkedAt: "2026-11-10"
    }
  ]
};
