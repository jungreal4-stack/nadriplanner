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
 *   links       관련 글 최대 3개 (선택). 각 항목: { title, url, source, kind, date }
 *                 title  글 제목 그대로 / url  글 주소(https) / source  "네이버 블로그", "네이버 카페", "뉴스" 등
 *                 kind   review(후기) | notice(공지) | news(기사) | info(소개) / date  글 작성일 YYYY-MM-DD (선택)
 */
window.NADRI_EVENTS = {
  updatedAt: "2026-11-12",
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
      links: [
        {"title": "[백남준아트센터] 색동: 우주오페라 / [경기도어린이박물관] 모두의식탁 프로그램참여 (2026.06.06 토)", "url": "https://blog.naver.com/allaboutmyday/224309655845", "source": "네이버 블로그", "kind": "review", "date": "2026-06-08"},
        {"title": "경기도어린이박물관 아이와 나들이｜모두의 식탁 피자 만들기부터 자석블록 놀이까지", "url": "https://blog.naver.com/4everluvyou/224449031367", "source": "네이버 블로그", "kind": "review", "date": "2026-10-21"},
        {"title": "용인 아이랑 갈 만한 곳｜경기도어린이박물관 체험 3가지, 예약부터 주차까지", "url": "https://blog.naver.com/playwithkids_kr/224454685665", "source": "네이버 블로그", "kind": "info", "date": "2026-10-26"}
      ],
      checkedAt: "2026-11-10"
    },
    {
      id: "20260801-nfm-find-folk",
      title: "[2026년 하반기 주말 교육] 찾아라! 민속",
      category: "family",
      sido: "서울", city: "종로구", near: false,
      place: "국립민속박물관 상설전시관·야외전시장 (활동지 배부: 상설전시관 2·3관 사이)",
      start: "2026-08-01", end: "2026-11-29",
      time: "매주 토·일 14:30~16:30 (활동지는 16:10까지 배부)",
      age: "어린이 동반 가족",
      price: "무료",
      applyHow: "사전 신청 없이 현장 접수",
      summary: "가족이 전시실과 야외전시장을 돌며 주제별 활동지(1장 약 30분)를 푸는 자율 탐방 프로그램. 하루 2장까지 받을 수 있고, 2장을 완성하면 기념품을 준다. 11월 남은 날짜는 14·15·21·22·28·29일.",
      url: "https://www.nfm.go.kr/kids/nfmkid/education/selectEducation.do?e_seq=13918&pageIndex=1&subType=I",
      links: [
        {"title": "국립민속박물관 아이랑 갔다가 무료 체험 발견, 찾아라 민속! 활동지 풀면 선물 받아요", "url": "https://blog.naver.com/san-bom/224286476206", "source": "네이버 블로그", "kind": "review", "date": "2026-05-15"}
      ],
      checkedAt: "2026-11-12"
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
      links: [
        {"title": "용인 경기도어린이박물관｜ 아기랑 실내 가볼 만한 곳 ·주차정보·11월 무료 운영일·체험 프로그램 예약 안내", "url": "https://blog.naver.com/nae-ongi/224432746679", "source": "네이버 블로그", "kind": "info", "date": "2026-10-06"},
        {"title": "아이 체험하는곳 서울 경기 6곳 (예약 꿀팁 총정리)", "url": "https://blog.naver.com/beallthere__/224466592576", "source": "네이버 블로그", "kind": "info", "date": "2026-11-06"},
        {"title": "아이와 경기도어린이박물관 11월 나들이, 무료운영일 7 · 8 · 21 · 22일 · 3층 공사 · 회차 예매 · 주차비", "url": "https://blog.naver.com/sopoong-kids/224466016575", "source": "네이버 블로그", "kind": "info", "date": "2026-11-06"}
      ],
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
      links: [
        {"title": "국립농업박물관 전시｜부엌의 일상을 새롭게 바라보다, 《따스하게 달그락》", "url": "https://blog.naver.com/agriculturalmuseum/224472598240", "source": "네이버 블로그", "kind": "notice", "date": "2026-11-11"},
        {"title": "따스하게 달그락, 수원 국립농업박물관", "url": "https://blog.naver.com/ubouno/224471209458", "source": "네이버 블로그", "kind": "review", "date": "2026-11-10"},
        {"title": "수원 아이와 가볼만한곳 국립농업박물관 주말 나들이! 곤충관·식물원부터 11월 기획전시까지 (어린이박물관 휴관 정보)", "url": "https://blog.naver.com/blanc-mj/224470266060", "source": "네이버 블로그", "kind": "review", "date": "2026-11-09"}
      ],
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
      links: [
        {"title": "장난감 악기의 경계를 넘어 현대음악의 새로운 음향을 탐색하다", "url": "https://blog.naver.com/klingsol/224476669894", "source": "네이버 블로그", "kind": "review", "date": "2026-11-14"},
        {"title": "2026 제7회 장난감 음악제, 아이와 볼까? 공연 일정·티켓 가격 정리", "url": "https://blog.naver.com/narcissus0103/224469647012", "source": "네이버 블로그", "kind": "info", "date": "2026-11-09"},
        {"title": "장난감음악제 2026, 작은 피아노 앞에 어른 연주자들이 모였습니다", "url": "https://blog.naver.com/sell_memories/224462239450", "source": "네이버 블로그", "kind": "info", "date": "2026-11-02"}
      ],
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
      links: [
        {"title": "[광대생각] 예술경영지원센터 2025 공연예술 지역 유통지원사업 <줄 타는 아이와 아프리카도마뱀> 공연 후기 in 군산예술의전당", "url": "https://blog.naver.com/2013playedu/224110488543", "source": "네이버 블로그", "kind": "review", "date": "2025-12-15"},
        {"title": "이번 주 수원 행사 4선 | 2026년 11월 13~15일 주말 가볼 만한 곳", "url": "https://blog.naver.com/shin_jm_/224472979858", "source": "네이버 블로그", "kind": "info", "date": "2026-11-11"},
        {"title": "\"딱 하루만 열린다고?\" 이번 주말 수원에서 아이와 꼭 봐야 할 이색 공연!", "url": "https://blog.naver.com/harusuzip-/224476382800", "source": "네이버 블로그", "kind": "info", "date": "2026-11-14"}
      ],
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
      links: [
        {"title": "🌿 2026 제2회 별빛내린 도림천 생태공예문화 페스타 총정리! 일정·체험·공연 시간표·주차 안내", "url": "https://blog.naver.com/ssanggaya/224472880784", "source": "네이버 블로그", "kind": "info", "date": "2026-11-12"},
        {"title": "2026 별빛내린 도림천 페스타 무료 체험키트 선착순 250명, 몇 시에 가야 할까?", "url": "https://blog.naver.com/darimpick/224473594332", "source": "네이버 블로그", "kind": "info", "date": "2026-11-12"},
        {"title": "2026 별빛내린 도림천 페스타｜서울 아이와 무료 체험·공연, 예약과 주차", "url": "https://blog.naver.com/3chaediary/224472748628", "source": "네이버 블로그", "kind": "info", "date": "2026-11-11"}
      ],
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
      links: [
        {"title": "인천 남동소래아트홀 어린이 뮤지컬 할인, 11월 타키포오·12월 루돌프 공연정보", "url": "https://blog.naver.com/yull_velymom/224471686726", "source": "네이버 블로그", "kind": "info", "date": "2026-11-10"},
        {"title": "대구 어린이 세상 타키포오 뮤지컬 후기｜8살 아이와 뮤지컬, 주차 팁까지", "url": "https://blog.naver.com/dalbodreday/224410002053", "source": "네이버 블로그", "kind": "review", "date": "2026-09-13"},
        {"title": "뮤지컬 타키포오 「몬스터 전쟁의 서막 ; 더 좀비」 관람 후기", "url": "https://blog.naver.com/farrr/224406112814", "source": "네이버 블로그", "kind": "review", "date": "2026-09-09"}
      ],
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
      links: [
        {"title": "[인터파크티켓] 송승환의 가족뮤지컬〈더 스토리 오브 언더더씨〉- 수원 티켓오픈 안내", "url": "https://blog.naver.com/hohomom0225/224295694685", "source": "네이버 블로그", "kind": "notice", "date": "2026-05-25"},
        {"title": "어린이뮤지컬 추천｜송승환의 더 스토리 오브 언더더씨 관람 후기", "url": "https://blog.naver.com/wooju--/224470219469", "source": "네이버 블로그", "kind": "review", "date": "2026-11-10"},
        {"title": "올림픽공원 어린이 뮤지컬 추천, 6살 아이와 본 더 스토리 오브 언더더씨 관람 후기", "url": "https://blog.naver.com/rhoseunga/224409933533", "source": "네이버 블로그", "kind": "review", "date": "2026-09-13"}
      ],
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
      links: [
        {"title": "[공연 초대] 구의동 명성태권도 시범단, 어린이대공원 열린무대에서 만나요!", "url": "https://blog.naver.com/myeongseong_tkd/224471711224", "source": "네이버 블로그", "kind": "notice", "date": "2026-11-10"},
        {"title": "어린이대공원 숲속의 무대 태권도 무료 공연 - 명성태권도 시범단", "url": "https://blog.naver.com/myeongseong_tkd/224240160068", "source": "네이버 블로그", "kind": "notice", "date": "2026-04-04"}
      ],
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
      links: [
        {"title": "성남 영유아 뮤지컬 사과가 쿵, 11월 공연 일정과 티켓 할인 예매 팁", "url": "https://blog.naver.com/daldal_123/224457538103", "source": "네이버 블로그", "kind": "info", "date": "2026-10-29"},
        {"title": "사과가 쿵! 어린이 뮤지컬 | 37개월 아이와 주말 공연 관람", "url": "https://blog.naver.com/sunnylee0917/224465781996", "source": "네이버 블로그", "kind": "review", "date": "2026-11-05"},
        {"title": "25개월 아기 첫 뮤지컬 사과가 쿵 후기｜55분 끝까지 볼 수 있을까?", "url": "https://blog.naver.com/chosen_zip/224426545467", "source": "네이버 블로그", "kind": "review", "date": "2026-09-30"}
      ],
      checkedAt: "2026-11-10"
    },
    {
      id: "20261121-boardgame-festa",
      title: "2026 보드게임페스타(시즌2)",
      category: "festival",
      sido: "서울", city: "강남구", near: true,
      place: "세텍(SETEC) 1·2 전시실",
      start: "2026-11-21", end: "2026-11-22",
      time: "21일 10:00~18:00 / 22일 10:00~17:00",
      price: "1인 5,000원 (사전예매 4,500원)",
      summary: "새로 나온 보드게임과 출시 예정작을 직접 해 보는 체험 행사. 가족이 체험존에서 함께 게임을 하고, 루미큐브 등 보드게임 대회와 할인 판매존도 둘러볼 수 있다.",
      url: "http://www.boardgamefesta.com",
      note: "공식 홈페이지 접속 실패(503), 행사 정보는 축제 안내 페이지 기준. 어린이 요금은 공식 확인 필요",
      links: [
        {"title": "2026 보드게임페스타 시즌2 일정 총정리 | 요금·위치·시간·체험·가족나들이·주차", "url": "https://blog.naver.com/maplesonic6/224461310015", "source": "네이버 블로그", "kind": "info", "date": "2026-11-02"},
        {"title": "2026 보드게임페스타 시즌2 예매 가격, 어린이 무료입장 세텍 일정과 주차 총정리", "url": "https://blog.naver.com/mysticbp/224471107712", "source": "네이버 블로그", "kind": "info", "date": "2026-11-10"},
        {"title": "2026 보드게임페스타 시즌2｜세텍 일정·입장료·아이와 체험할 거리", "url": "https://blog.naver.com/puffmori/224476030891", "source": "네이버 블로그", "kind": "info", "date": "2026-11-13"}
      ],
      checkedAt: "2026-11-12"
    },
    {
      id: "20261205-matchgirl-seongnam",
      title: "2026 겨울특집 가족 뮤지컬 〈성냥팔이소녀〉 - 성남",
      category: "show",
      sido: "경기", city: "성남시 분당구", near: true,
      place: "성남아트센터 앙상블시어터",
      start: "2026-12-05", end: "2026-12-06",
      time: "토·일 11:00, 14:00, 16:30 (55분)",
      age: "24개월 이상",
      price: "전석 40,000원 (기본할인 22,000원)",
      applyHow: "NOL티켓 예매 (11/12 확인 때 '예매대기' 상태, 예매 오픈일은 페이지에 없음)",
      summary: "안데르센 동화 『성냥팔이 소녀』를 옮긴 겨울 가족 뮤지컬. 집 가까운 성남아트센터에서 연말 분위기의 공연을 본다.",
      url: "https://nol.yanolja.com/ticket/products/26014948",
      checkedAt: "2026-11-12"
    }
  ]
};
