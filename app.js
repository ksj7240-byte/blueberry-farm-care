/**
 * 블루베리 스마트 재배 관리 & 품종 도감 (Blueberry Farm Care)
 * Core Application Logic & Database
 */

// 1. 14대 대표 블루베리 품종 데이터베이스
const VARIETIES_DATA = [
  {
    id: "duke",
    name: "듀크 (Duke)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "조생종 (6월 초순~중순)",
    seasonType: "early",
    fruitSize: "대과종",
    brix: 12.5,
    acidity: "중",
    hardiness: -25,
    chillingHours: 900,
    potSuitable: true,
    selfFertile: "양호 (수분수 혼식 권장)",
    recommendedPollinators: ["스파르탄", "블루크롭"],
    features: [
      "국내 노지 및 대형 화분 기준 가장 대중적이고 안정적인 조생종",
      "개화기가 비교적 늦어 늦서리 피해 회피에 유리함",
      "과분이 미려하고 과실이 단단하여 유통 및 저장성 우수"
    ],
    caution: "완숙 3~5일 전에는 겉이 파래도 신맛이 강하므로 꼭지 링 부위까지 완숙 후 수확 필수"
  },
  {
    id: "spartan",
    name: "스파르탄 (Spartan)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "조중생종 (6월 중순~하순)",
    seasonType: "mid",
    fruitSize: "극대과종 (500원 동전급)",
    brix: 14.0,
    acidity: "중강",
    hardiness: -23,
    chillingHours: 900,
    potSuitable: false,
    selfFertile: "양호",
    recommendedPollinators: ["듀크", "블루크롭"],
    features: [
      "독보적인 향기와 당산비로 맛과 풍미 최상급 프리미엄 품종",
      "과실 크기가 매우 커 직판장 및 백화점 최고가 형성"
    ],
    caution: "토양 적응력이 까다로움. 유기물이 극히 풍부하고 배수가 완벽한 토양에서만 정상 생육"
  },
  {
    id: "bluecrop",
    name: "블루크롭 (Bluecrop)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "중생종 (6월 하순~7월 초)",
    seasonType: "mid",
    fruitSize: "대과종",
    brix: 13.0,
    acidity: "중",
    hardiness: -28,
    chillingHours: 1100,
    potSuitable: true,
    selfFertile: "우수",
    recommendedPollinators: ["듀크", "드레이퍼"],
    features: [
      "전 세계 블루베리 재배의 글로벌 표준 품종",
      "가뭄, 혹한(-28℃), 병충해 적응력이 독보적으로 우수",
      "산간 한랭지 및 전국 노지 재배 최적"
    ],
    caution: "과다 착과 경향이 심해 강한 꽃눈 솎기와 동계 전정을 하지 않으면 해거리 및 소과화 발생"
  },
  {
    id: "chandler",
    name: "챈들러 (Chandler)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "중만생종 (7월 초~8월 초)",
    seasonType: "late",
    fruitSize: "세계 최대급 초대과 (3~5g)",
    brix: 12.0,
    acidity: "약",
    hardiness: -20,
    chillingHours: 900,
    potSuitable: true,
    selfFertile: "양호",
    recommendedPollinators: ["블루크롭", "드레이퍼"],
    features: [
      "단과중 최대 5g에 달하는 거봉급 압도적 크기",
      "수확 기간이 4~6주간 지속되어 주말농장 및 수확체험 선호도 1위",
      "산미가 적고 식감이 부드러움"
    ],
    caution: "장마철과 겹치므로 비가림 재배 권장. 과피가 얇아 장거리 유통 시 세심한 취급 필요"
  },
  {
    id: "draper",
    name: "드레이퍼 (Draper)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "중생종 (6월 하순)",
    seasonType: "mid",
    fruitSize: "대과종",
    brix: 13.5,
    acidity: "중",
    hardiness: -23,
    chillingHours: 900,
    potSuitable: true,
    selfFertile: "우수",
    recommendedPollinators: ["블루크롭", "듀크"],
    features: [
      "과육이 돌처럼 단단하여 상온 저장력과 유통성이 탁월",
      "수확 후 품질 저하가 적어 농산물 유통법인 및 대형마트 납품 1순위",
      "기계 수확에 최적화된 최신 인기 품종"
    ],
    caution: "유목기 초기 생장이 다소 완만하므로 정식 후 1~2년간 수세 형성에 집중해야 함"
  },
  {
    id: "elliott",
    name: "엘리엇 (Elliott)",
    lineage: "북부 하이부시",
    lineageType: "northern",
    season: "극만생종 (8월 초순~하순)",
    seasonType: "late",
    fruitSize: "중과종",
    brix: 12.5,
    acidity: "강 (완숙 전)",
    hardiness: -25,
    chillingHours: 1100,
    potSuitable: false,
    selfFertile: "양호",
    recommendedPollinators: ["블루크롭"],
    features: [
      "여름 단경기(8월) 틈새 출하를 통한 높은 농가 수취 가격 확보",
      "청색이 짙고 저장력이 뛰어나 늦여름 시장 독점 가능"
    ],
    caution: "완숙에 시간이 오래 걸리며 조기 수확 시 강한 신맛이 남아 소비자 불만 유발 가능"
  },
  {
    id: "star",
    name: "스타 (Star)",
    lineage: "남부 하이부시",
    lineageType: "southern",
    season: "조생종 (5월 하순 하우스 / 6월초 노지)",
    seasonType: "early",
    fruitSize: "대과종",
    brix: 12.5,
    acidity: "중약",
    hardiness: -15,
    chillingHours: 350,
    potSuitable: true,
    selfFertile: "낮음 (수분수 필수)",
    recommendedPollinators: ["오닐", "미스티"],
    features: [
      "개화기가 빨라 남부 시설 촉성재배 조기 출하의 핵심 주력 품종",
      "열매 꼭지 부위 파손이 적고 균일한 규격 생산 가능"
    ],
    caution: "단독 식재 시 착과율이 급감하므로 오닐 등 수분수를 20~30% 반드시 교차 식재"
  },
  {
    id: "oneal",
    name: "오닐 (O'Neal)",
    lineage: "남부 하이부시",
    lineageType: "southern",
    season: "극조생종 (5월 중순 시설 / 5월말 노지)",
    seasonType: "early",
    fruitSize: "중대과종",
    brix: 14.5,
    acidity: "약",
    hardiness: -15,
    chillingHours: 250,
    potSuitable: true,
    selfFertile: "중간",
    recommendedPollinators: ["스타", "미스티"],
    features: [
      "저온요구도가 200~300시간으로 매우 짧아 시설 초조기 출하에 적합",
      "남부종 중 당도가 최고 수준이며 특유의 깊은 향미가 탁월",
      "베란다 및 가온 온실 화분 재배 선호도 최상위"
    ],
    caution: "수확 후 수세가 급격히 약화될 수 있으므로 수확 직후 비배 관리와 관수 보충 철저"
  },
  {
    id: "misty",
    name: "미스티 (Misty)",
    lineage: "남부 하이부시",
    lineageType: "southern",
    season: "조중생종 (6월 초순~중순)",
    seasonType: "mid",
    fruitSize: "대과종",
    brix: 13.0,
    acidity: "중",
    hardiness: -12,
    chillingHours: 250,
    potSuitable: true,
    selfFertile: "우수",
    recommendedPollinators: ["오닐", "스타"],
    features: [
      "수세가 극도로 왕성하며 성장이 빨라 조기 다수확 가능",
      "과분이 풍부하고 고온 다습 기후에 대한 적응력 우수"
    ],
    caution: "꽃눈이 지나치게 많이 맺히므로 50% 이상 강력하게 꽃솎기를 하지 않으면 나무가 쇠약해짐"
  },
  {
    id: "legacy",
    name: "레거시 (Legacy)",
    lineage: "남부 하이부시",
    lineageType: "southern",
    season: "중만생종 (6월 하순~7월 중순)",
    seasonType: "mid",
    fruitSize: "대과종",
    brix: 14.0,
    acidity: "중약",
    hardiness: -17,
    chillingHours: 550,
    potSuitable: true,
    selfFertile: "우수",
    recommendedPollinators: ["선샤인블루", "오닐"],
    features: [
      "북부종과 남부종의 교배형으로 뛰어난 맛과 다수확성을 겸비",
      "남부 전역은 물론 중부 남단 노지에서도 월동이 가능한 준수한 내한성"
    ],
    caution: "겨울철에도 잎이 늦게까지 지지 않는 반상록성을 띠므로 늦가을 첫서리 피해 유의"
  },
  {
    id: "sunshineblue",
    name: "선샤인블루 (Sunshine Blue)",
    lineage: "남부 하이부시",
    lineageType: "southern",
    season: "중생종 (6월 하순)",
    seasonType: "mid",
    fruitSize: "중과종",
    brix: 14.0,
    acidity: "약",
    hardiness: -15,
    chillingHours: 150,
    potSuitable: true,
    selfFertile: "100% 자가수정 (단독 결실)",
    recommendedPollinators: ["단독 식재 가능"],
    features: [
      "수고 1m 내외의 반왜성 품종으로 베란다 및 테라스 화분 재배 1위 추천",
      "자가수정률 100%로 꿀벌이나 수분수 없이도 1그루만으로 결실 풍성",
      "꽃봉오리가 분홍색으로 아름다워 관상용 가치 극대화"
    ],
    caution: "배지 배수가 불량하면 과습으로 뿌리가 상할 수 있으므로 펄라이트 비율 30% 유지"
  },
  {
    id: "powderblue",
    name: "파우더블루 (Powderblue)",
    lineage: "래빗아이",
    lineageType: "rabbiteye",
    season: "중만생종 (7월 중순~8월 초)",
    seasonType: "late",
    fruitSize: "중과종",
    brix: 13.5,
    acidity: "중약",
    hardiness: -10,
    chillingHours: 450,
    potSuitable: false,
    selfFertile: "불가 (타가수분 필수)",
    recommendedPollinators: ["티프블루", "오크락코니"],
    features: [
      "백분(과분)이 은은하고 두꺼워 외관 상품성이 미려함",
      "비가 잦은 한여름 장마철에도 열과(터짐) 발생이 극히 적음",
      "건조 및 척박지 적응력이 뛰어남"
    ],
    caution: "래빗아이 특성상 중북부 노지 재배 시 동해 위험. 반드시 래빗아이 타 품종 혼식"
  },
  {
    id: "tifblue",
    name: "티프블루 (Tifblue)",
    lineage: "래빗아이",
    lineageType: "rabbiteye",
    season: "만생종 (7월 하순~8월 중순)",
    seasonType: "late",
    fruitSize: "중대과종",
    brix: 14.5,
    acidity: "약 (완숙 시)",
    hardiness: -10,
    chillingHours: 550,
    potSuitable: false,
    selfFertile: "불가 (타가수분 필수)",
    recommendedPollinators: ["파우더블루", "오크락코니"],
    features: [
      "래빗아이를 대표하는 전설적인 다수확·고환경적응성 품종",
      "완숙 시 당도가 14~15 Brix 이상 도달하여 꿀맛을 자랑함"
    ],
    caution: "덜 익은 상태에서는 떫고 신맛이 강하므로 반드시 완숙 후 수확"
  },
  {
    id: "ochlockonee",
    name: "오크락코니 (Ochlockonee)",
    lineage: "래빗아이",
    lineageType: "rabbiteye",
    season: "극만생종 (8월 초순~하순)",
    seasonType: "late",
    fruitSize: "대과종",
    brix: 14.0,
    acidity: "중약",
    hardiness: -10,
    chillingHours: 500,
    potSuitable: false,
    selfFertile: "불가 (타가수분 필수)",
    recommendedPollinators: ["티프블루", "파우더블루"],
    features: [
      "래빗아이 중 드물게 알이 크고 꼭지 자리가 작아 저장성이 뛰어남",
      "8월 늦여름 단경기 프리미엄 대과 출하 가능"
    ],
    caution: "동해에 취약하므로 남부 해안 및 제주도 지역 재배에 한정"
  }
];

// 2. 월별 영농 캘린더 데이터
const CALENDAR_DATA = [
  {
    month: "3월",
    title: "발아 준비 및 관수 개시",
    tasks: [
      "동면 해빙 관수 개시: 3월 중순부터 점적관수 가동 (토양 수분장력 20~30kPa)",
      "휴면기 가지치기(동계 전정) 최종 마무리",
      "화분 완효성 코팅 비료(CRF: 오스모코트 등) 10L당 15~20g 표면 시비"
    ],
    alert: "봄철 꽃샘추위 늦서리 발생 시 살수빙결법 준비"
  },
  {
    month: "4월",
    title: "개화 및 수분 매개체 투입",
    tasks: [
      "하우스/과원에 호박벌(Bumblebee) 또는 꿀벌 투입 (10a당 1~2통)",
      "유목(1~2년생) 꽃눈 80% 이상 전량 제거 (수목 골격 형성)",
      "성목 결과지 선단 꽃눈 3~4개만 남기고 꽃솎기(적화) 시행"
    ],
    alert: "최저기온 0℃ 이하 예보 시 방상팬 및 미세살수기 가동"
  },
  {
    month: "5월",
    title: "착과 및 과실 1차 비대",
    tasks: [
      "암모늄태 질소(황산암모늄/유안) 1차 시비 (질산태 비료 사용 금지)",
      "새순 잎맥 황화현상 발생 시 킬레이트 철(Fe-EDDHA) 1,000배액 엽면 살포",
      "남부 조생종(오닐, 스타) 시설 하우스 조기 수확 개시"
    ],
    alert: "일교차가 클 때 잿빛곰팡이병 방제 및 통풍 확보"
  },
  {
    month: "6월",
    title: "본격 수확기 (조·중생종)",
    tasks: [
      "듀크, 스파르탄, 블루크롭 수확: 꼭지 안쪽 링까지 완숙 확인 후 수확",
      "수확 골든타임 준수: 이슬 마른 아침 06:00~10:00 사이 수확 (품온 상승 방지)",
      "수확 즉시 10~15℃ 1차 그늘 예냉 후 0~2℃ 저온저장고 입고",
      "과원 조류 피해 방지를 위한 18mm 메쉬 방조망 설치"
    ],
    alert: "장마철 집중호우 대비 배수로 정비 (침수 피해 방지)"
  },
  {
    month: "7월",
    title: "만생종 수확 & 하계 전정",
    tasks: [
      "챈들러, 파우더블루 수확 및 직판 관리",
      "수확 직후 지제부 도장지(바잘슛) 50~60cm 높이에서 끝순 자르기(적심)",
      "한여름 화분 일일 1~2회 집중 관수 (06~08시, 18시 이후)"
    ],
    alert: "폭염(33℃ 이상) 직사광선 일소 피해 시 15~20% 차광막 가동"
  },
  {
    month: "8월",
    title: "수확 마무리 및 질소질 중단",
    tasks: [
      "극만생종(엘리엇, 티프블루) 수확 완료",
      "★ 중요: 8월 중순 이후 질소질 비료 전면 중단 (가을 2차 성장 억제 및 목질화 유도)",
      "갈색날개매미충 및 탄저병 방제 관리"
    ],
    alert: "질소를 늦게 주면 가지가 얼어붙어 겨울철 100% 동사함"
  },
  {
    month: "9월",
    title: "화아 분화 및 저장양분 축적",
    tasks: [
      "감사비료 엽면시비: 인산·칼륨 성분 영양제 1~2회 살포 (세포 동결온도 강하)",
      "내년도 열매가 달릴 꽃눈 형성기이므로 건조 피해 없도록 적정 관수",
      "화분 재배지 주변 잡초 제거 및 배수 상태 점검"
    ],
    alert: "늦가을 연약한 신초 발생 억제"
  },
  {
    month: "10월",
    title: "단풍 및 양분 전류 (동면 준비)",
    tasks: [
      "잎이 붉게 물들며 잎 속 영양분이 뿌리와 주간부로 이동하는 시기",
      "관수 횟수를 점진적으로 줄여 수목의 휴면 유도",
      "월동용 자재(보온 부직포, 볏짚, 친환경 백색 수성페인트) 사전 점검"
    ],
    alert: "급격한 첫서리 전 생육 마감 점검"
  },
  {
    month: "11월",
    title: "★ 동해방지 관수 및 주간부 보온",
    tasks: [
      "★ 동해방지 관수(Winterizing): 11월 중하순 땅이 얼기 직전 30~40mm 충분한 관수",
      "주간부 백색 수성페인트(물 1:1 희석) 50cm 높이 도포 (동열/수피 터짐 방지)",
      "화분 재배: 배지 바닥까지 흠뻑 1차 동면 입면 관수 실시",
      "화분 밀집 클러스터링 모으기 및 볏짚/부직포 3중 피복 또는 2/3 땅 매립"
    ],
    alert: "겨울철 찬바람에 의한 '동건(건조 탈수사)' 방지 관수 절대 필수"
  },
  {
    month: "12월~2월",
    title: "휴면기 동계 전정 & 화분 정기 보충 관수",
    tasks: [
      "동계 전정 3단계: 1) 마르고 병든 가지/교차지 제거, 2) 5년 이상 노후 주축지 갱신, 3) 직경 4~6mm 충실한 결과지만 존치",
      "화분 겨울철 보충 관수: 월 1~2회, 반드시 따뜻한 맑은 날 정오(11~13시) 미온수로 표면 보충",
      "과원 북서쪽 3~4m 방풍망 점검"
    ],
    alert: "흐린 날이나 해 질 무렵 화분 물주기는 화분 전체를 얼려 뿌리를 죽이므로 절대 금지"
  }
];

// 3. UI 렌더링 및 인터랙션 로직
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderVarieties(VARIETIES_DATA);
  initVarietyFilters();
  initPotCalculator();
  initSoilCalculator();
  initFrostSimulator();
  renderCalendar();
  initThemeAndQuickActions();
});

// 탭 네비게이션
function initTabs() {
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const tabContents = document.querySelectorAll(".tab-content-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      tabButtons.forEach(b => {
        b.classList.remove("active", "border-indigo-600", "text-indigo-600", "dark:text-indigo-400", "font-bold");
        b.classList.add("text-gray-500", "dark:text-gray-400");
      });
      btn.classList.add("active", "border-indigo-600", "text-indigo-600", "dark:text-indigo-400", "font-bold");
      btn.classList.remove("text-gray-500", "dark:text-gray-400");

      tabContents.forEach(panel => {
        panel.classList.toggle("hidden", panel.id !== target);
      });
    });
  });
}

// 품종 카드 렌더링
function renderVarieties(list) {
  const container = document.getElementById("variety-cards-grid");
  const countBadge = document.getElementById("variety-count-badge");
  if (!container) return;

  countBadge.textContent = `${list.length}개 품종`;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-gray-500 dark:text-gray-400">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
        <p class="text-lg font-medium">조건에 일치하는 품종이 없습니다.</p>
        <p class="text-sm mt-1">필터 조건을 완화하거나 검색어를 변경해 보세요.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = list.map(v => {
    const badgeColor = 
      v.lineageType === "northern" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200" :
      v.lineageType === "southern" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200" :
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200";

    return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs px-2.5 py-1 rounded-full font-semibold ${badgeColor}">
              ${v.lineage}
            </span>
            <span class="text-xs text-gray-400 dark:text-gray-400 flex items-center gap-1 font-medium">
              <i data-lucide="snowflake" class="w-3.5 h-3.5 text-cyan-500"></i> ${v.hardiness}℃
            </span>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            ${v.name}
          </h3>
          <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1 mb-4">
            ${v.season} · ${v.fruitSize}
          </p>

          <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-gray-700/50 p-3 rounded-xl mb-4">
            <div>
              <span class="text-gray-400 dark:text-gray-400">당도:</span>
              <strong class="text-gray-800 dark:text-gray-200 ml-1 font-semibold">${v.brix} Brix</strong>
            </div>
            <div>
              <span class="text-gray-400 dark:text-gray-400">저온요구:</span>
              <strong class="text-gray-800 dark:text-gray-200 ml-1 font-semibold">${v.chillingHours}h</strong>
            </div>
            <div>
              <span class="text-gray-400 dark:text-gray-400">화분적성:</span>
              <span class="ml-1 font-semibold ${v.potSuitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}">
                ${v.potSuitable ? '적합 ★' : '노지권장'}
              </span>
            </div>
            <div>
              <span class="text-gray-400 dark:text-gray-400">자가수정:</span>
              <span class="ml-1 font-medium text-gray-700 dark:text-gray-300 truncate block">${v.selfFertile}</span>
            </div>
          </div>

          <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 mb-4">
            ${v.features.map(f => `<li class="flex items-start gap-1.5"><span class="text-indigo-500">•</span><span>${f}</span></li>`).join("")}
          </ul>
        </div>

        <div class="pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs">
          <span class="text-gray-500 dark:text-gray-400">수분수: <strong class="text-gray-700 dark:text-gray-300">${v.recommendedPollinators.join(", ")}</strong></span>
          <button onclick="openVarietyModal('${v.id}')" class="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline">
            상세 보기 <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// 품종 필터링 & 검색
function initVarietyFilters() {
  const searchInput = document.getElementById("variety-search");
  const lineageFilter = document.getElementById("lineage-filter");
  const seasonFilter = document.getElementById("season-filter");
  const potCheckbox = document.getElementById("pot-only-filter");

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const lineage = lineageFilter.value;
    const season = seasonFilter.value;
    const potOnly = potCheckbox.checked;

    const filtered = VARIETIES_DATA.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(query) || 
                          v.features.some(f => f.toLowerCase().includes(query)) ||
                          v.caution.toLowerCase().includes(query);
      const matchLineage = lineage === "all" || v.lineageType === lineage;
      const matchSeason = season === "all" || v.seasonType === season;
      const matchPot = !potOnly || v.potSuitable;

      return matchSearch && matchLineage && matchSeason && matchPot;
    });

    renderVarieties(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  lineageFilter.addEventListener("change", applyFilters);
  seasonFilter.addEventListener("change", applyFilters);
  potCheckbox.addEventListener("change", applyFilters);
}

// 품종 모달 열기
window.openVarietyModal = function(id) {
  const v = VARIETIES_DATA.find(item => item.id === id);
  if (!v) return;

  const modal = document.getElementById("variety-detail-modal");
  const modalContent = document.getElementById("variety-modal-content");

  modalContent.innerHTML = `
    <div class="relative">
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs px-2.5 py-1 rounded-full font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
            ${v.lineage}
          </span>
          <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">${v.name}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">${v.season} · ${v.fruitSize}</p>
        </div>
        <button onclick="closeVarietyModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-gray-700/60 p-4 rounded-xl mb-6 text-center">
        <div>
          <p class="text-xs text-gray-400">평균 당도</p>
          <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400">${v.brix} Brix</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">내한성 한계</p>
          <p class="text-lg font-bold text-cyan-600 dark:text-cyan-400">${v.hardiness} ℃</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">저온 요구시간</p>
          <p class="text-lg font-bold text-blue-600 dark:text-blue-400">${v.chillingHours} 시간</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">화분 재배</p>
          <p class="text-lg font-bold ${v.potSuitable ? 'text-emerald-600' : 'text-gray-400'}">
            ${v.potSuitable ? '강력 추천' : '노지 권장'}
          </p>
        </div>
      </div>

      <div class="space-y-4 text-sm text-gray-700 dark:text-gray-200">
        <div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4 text-indigo-500"></i> 주요 생육 및 재배 장점
          </h4>
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
            ${v.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
            <i data-lucide="git-merge" class="w-4 h-4 text-purple-500"></i> 자가 결실성 및 수분수 조합
          </h4>
          <p class="text-gray-600 dark:text-gray-300">
            결실 특성: <strong>${v.selfFertile}</strong><br>
            추천 수분수 (20~30% 혼식): <strong class="text-indigo-600 dark:text-indigo-400">${v.recommendedPollinators.join(", ")}</strong>
          </p>
        </div>

        <div class="p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl">
          <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1.5 text-xs">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i> 재배 관리 시 필수 주의사항
          </h4>
          <p class="text-xs text-amber-700 dark:text-amber-300">${v.caution}</p>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        <button onclick="closeVarietyModal()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition">
          닫기
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  lucide.createIcons();
};

window.closeVarietyModal = function() {
  document.getElementById("variety-detail-modal").classList.add("hidden");
};

// 4. 화분 배지 배합 및 수화 계산기
function initPotCalculator() {
  const potSizeSelect = document.getElementById("calc-pot-size");
  const potCountInput = document.getElementById("calc-pot-count");
  const customPotSizeInput = document.getElementById("calc-custom-size");
  const customSizeContainer = document.getElementById("custom-size-container");

  function calculate() {
    let sizeL = parseFloat(potSizeSelect.value);
    if (sizeL === 0) {
      customSizeContainer.classList.remove("hidden");
      sizeL = parseFloat(customPotSizeInput.value) || 0;
    } else {
      customSizeContainer.classList.add("hidden");
    }

    const count = parseInt(potCountInput.value) || 0;
    const totalVolume = sizeL * count;

    // 표준 배합비: 피트모스 50%, 펄라이트 25%, 바크 25%
    const peatmossL = Math.round(totalVolume * 0.5);
    const perliteL = Math.round(totalVolume * 0.25);
    const barkL = Math.round(totalVolume * 0.25);

    // 피트모스 250L 압축백 환산 (약 2배 팽창 기준 고려, 대략 압축백 수량 계산)
    const peatmossBags250 = (peatmossL / 250).toFixed(1);
    const perliteBags50 = (perliteL / 50).toFixed(1);

    document.getElementById("res-total-vol").textContent = `${totalVolume} L`;
    document.getElementById("res-peatmoss-vol").textContent = `${peatmossL} L (~${peatmossBags250}포/250L)`;
    document.getElementById("res-perlite-vol").textContent = `${perliteL} L (~${perliteBags50}포/50L)`;
    document.getElementById("res-bark-vol").textContent = `${barkL} L`;

    // 권장 물먹이기(수화) 수분량 (피트모스 부피의 약 30~40%)
    const waterL = Math.round(peatmossL * 0.35);
    document.getElementById("res-water-hydration").textContent = `약 ${waterL} L의 미온수`;
  }

  potSizeSelect.addEventListener("change", calculate);
  potCountInput.addEventListener("input", calculate);
  customPotSizeInput.addEventListener("input", calculate);
  calculate();
}

// 5. 토양 pH 및 비배 진단기
function initSoilCalculator() {
  const phInput = document.getElementById("input-current-ph");
  const btnDiagnose = document.getElementById("btn-diagnose-ph");
  const resultCard = document.getElementById("ph-diagnosis-card");

  btnDiagnose.addEventListener("click", () => {
    const ph = parseFloat(phInput.value);
    if (isNaN(ph) || ph < 3 || ph > 9) {
      alert("올바른 pH 수치(3.0 ~ 9.0)를 입력해 주세요.");
      return;
    }

    let status = "";
    let badgeClass = "";
    let message = "";
    let prescription = "";

    if (ph >= 4.2 && ph <= 5.0) {
      status = "최적 산도 (안정적 생육 구간)";
      badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-300";
      message = "블루베리가 철분 및 미량원소를 가장 왕성하게 흡수할 수 있는 이상적인 산도 범위입니다.";
      prescription = "현 상태 유지. 관수 시 지하수 산도가 pH 6.5 이상으로 높다면 구연산/황산으로 4.8~5.2 보정하여 관수하세요.";
    } else if (ph < 4.2) {
      status = "과산성 (주의 구간)";
      badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300";
      message = "토양이 지나치게 강산성입니다. 알루미늄 및 망간 독성이 나타나 뿌리 생육이 저하될 수 있습니다.";
      prescription = "황(유황) 투입 즉시 중단. 깨끗한 물로 충분히 용탈(세척)하고, 필요 시 소량의 석회고토를 전문가 처방에 따라 단계별로 투입하세요.";
    } else if (ph > 5.0 && ph <= 5.5) {
      status = "약간 높음 (경계 구간)";
      badgeClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200 border-yellow-300";
      message = "산도가 상한선을 초과하기 시작했습니다. 점진적으로 신초 선단 황화현상이 나타날 수 있습니다.";
      prescription = "10a(300평)당 농용 유황가루 15~20kg을 표토에 고르게 살포 후 혼화하거나, 관수 시 구연산(물 1톤당 200~300g)을 희석 관주하세요.";
    } else {
      status = "심각한 알칼리/중성화 (철 결핍 고사 위험)";
      badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 border-rose-300";
      message = "위험 상태입니다! pH 5.5 이상에서는 불용화로 철분 흡수가 차단되어 신초가 노랗게 표백되며 성장이 멈추고 고사합니다.";
      prescription = "1) 즉각 응급 처방: 킬레이트 철(Fe-EDDHA) 1,000배액 엽면 및 관주 처리. 2) 유황분말(주당 30~50g) 두둑 표면 시비. 3) 질산태 비료 전면 금지하고 황산암모늄(유안)만 시비.";
    }

    resultCard.innerHTML = `
      <div class="p-5 rounded-2xl border ${badgeClass} transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-bold uppercase tracking-wider">진단 결과: ${status}</span>
          <span class="text-2xl font-black">pH ${ph.toFixed(1)}</span>
        </div>
        <p class="text-sm mb-3 opacity-90">${message}</p>
        <div class="bg-white/80 dark:bg-gray-800/80 p-3.5 rounded-xl border border-black/5 dark:border-white/10 text-xs">
          <strong class="block text-gray-900 dark:text-white font-semibold mb-1">📋 맞춤형 처방 지침:</strong>
          <span class="text-gray-700 dark:text-gray-300">${prescription}</span>
        </div>
      </div>
    `;
    resultCard.classList.remove("hidden");
  });
}

// 6. 동해·냉해 위험도 시뮬레이터
function initFrostSimulator() {
  const tempSlider = document.getElementById("sim-temp-slider");
  const tempValueDisplay = document.getElementById("sim-temp-display");
  const seasonRadio = document.getElementsByName("sim-season");
  const lineageSelect = document.getElementById("sim-lineage-select");
  const potRadio = document.getElementsByName("sim-cultivation");
  const resultBox = document.getElementById("sim-result-box");

  function getRadioValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : "";
  }

  function simulate() {
    const temp = parseFloat(tempSlider.value);
    tempValueDisplay.textContent = `${temp >= 0 ? '+' : ''}${temp} ℃`;

    const season = getRadioValue("sim-season"); // "spring" (봄 서리 냉해) vs "winter" (겨울 혹한 동해)
    const lineage = lineageSelect.value; // "northern", "southern", "rabbiteye"
    const isPot = getRadioValue("sim-cultivation") === "pot";

    let dangerLevel = "safe"; // safe, warn, danger, critical
    let title = "";
    let analysis = "";
    let actionList = [];

    if (season === "spring") {
      // 봄철 개화/발아기 늦서리 냉해 (-2℃ 이하 치명적)
      if (temp > 2) {
        dangerLevel = "safe";
        title = "안전 상태 (정상 개화 및 생육)";
        analysis = "기온이 영상으로 서리 피해 가능성이 매우 낮습니다.";
        actionList = ["정상적인 봄철 점적관수 유지", "호박벌 수분 활동 관찰"];
      } else if (temp <= 2 && temp >= 0) {
        dangerLevel = "warn";
        title = "서리 주의보 (0℃ ~ 2℃)";
        analysis = "새벽 방사냉각으로 지표면 온도가 0℃ 이하로 급강하할 수 있습니다. 갓 터진 꽃눈의 암술머리가 동결될 위험이 있습니다.";
        actionList = [
          "기온 0℃ 도달 직전부터 미세살수기(살수빙결법) 연속 가동 준비",
          "방상팬(송풍법) 가동으로 상공의 역전층 온기 하방 유입",
          "화분은 즉시 비닐하우스 내부나 건물 처마 밑으로 대피"
        ];
      } else if (temp < 0 && temp >= -2) {
        dangerLevel = "danger";
        title = "냉해 위험 경보 (0℃ ~ -2℃)";
        analysis = "개화 중인 꽃봉오리의 암술이 얼어붙어 결실이 불가능해지는 치명적 냉해가 발생할 수 있습니다.";
        actionList = [
          "★ 살수빙결법 가동: 물이 얼음으로 결빙될 때 방출하는 응고잠열(80cal/g)을 이용해 꽃눈 빙결막 형성",
          "주의: 해가 완전히 뜨고 얼음이 다 녹을 때까지 살수를 절대 중단하지 말 것",
          "아미노산 및 해조추출물 영양제 엽면 살포로 세포액 농도 강화"
        ];
      } else {
        dangerLevel = "critical";
        title = "극심한 냉해 재앙 (-2℃ 미만)";
        analysis = "수액이 오른 신초와 모든 꽃눈이 동사하여 한 해 농사가 전면 실패할 위험이 매우 높습니다.";
        actionList = [
          "살수빙결기 및 온풍기/열풍기 총력 가동",
          "노지 화분은 실내 비닐하우스로 전량 긴급 이동",
          "피해 발생 후 즉시 엽면 영양제와 살균제 도포로 2차 병해 차단"
        ];
      }
    } else {
      // 겨울철 혹한 동해
      // 내한성 기준: 북부 (-25℃), 남부 (-15℃), 래빗아이 (-10℃), 화분은 -5℃씩 가산 위험
      let limitTemp = lineage === "northern" ? -25 : lineage === "southern" ? -15 : -10;
      if (isPot) limitTemp += 7; // 화분은 지열 차단으로 7도 이상 더 취약

      if (temp > 0) {
        dangerLevel = "safe";
        title = "안전 (동면 휴면)";
        analysis = "정상적인 겨울 휴면 상태입니다.";
        actionList = ["토양이 건조하지 않도록 적절한 수분 점검", "동계 전정 작업 진행"];
      } else if (temp <= 0 && temp > limitTemp + 5) {
        dangerLevel = "warn";
        title = "주의 구간 (동계 한파)";
        analysis = "나무가 견딜 수 있는 범위 내이나, 찬 겨울바람에 의한 가지 건조 탈수사(동건 피해)에 유의해야 합니다.";
        actionList = [
          "11월 하순 동해방지 관수(30~40mm)가 충분히 되었는지 확인",
          "과원 북서쪽 방풍망 상태 점검",
          "화분은 바람이 덜 타는 건물 벽면으로 모으기(클러스터링)"
        ];
      } else if (temp <= limitTemp + 5 && temp > limitTemp) {
        dangerLevel = "danger";
        title = `동해 위험 경보 (${lineage === "northern" ? "북부" : lineage === "southern" ? "남부" : "래빗아이"} 한계온도 근접)`;
        analysis = `내한 한계 온도(${limitTemp}℃)에 근접하고 있습니다. 주간부 수피 열개 및 형성층 손상이 우려됩니다. ${isPot ? '(화분은 지열이 차단되어 뿌리 괴사 위험 극대화)' : ''}`;
        actionList = [
          "지면 50cm 높이까지 친환경 백색 수성페인트(1:1) 도포로 낮-밤 온도 편차 완충",
          "주간부 볏짚 및 보온 부직포 피복",
          isPot ? "★ 화분 3중 보온 부직포 밀폐 피복 또는 화분 높이 2/3 땅속 매립 가식 필수" : "두둑 표면 바크 멀칭재 10~15cm 보강"
        ];
      } else {
        dangerLevel = "critical";
        title = `극위험 동해 괴사 (${limitTemp}℃ 이하 초과)`;
        analysis = "내한성 한계를 초과하여 주간부가 찢어지고 세포막이 파괴되어 수목이 고사합니다.";
        actionList = [
          "긴급 보온 덮개 및 비닐 2중 보온 텐트 가설",
          "화분은 무가온 하우스나 0~5℃ 저온 창고로 즉시 이동 (난방 거실은 조기 개화하므로 금지!)",
          "해빙 후 수피 균열 부위에 톱신페스트 도포제 긴급 도포"
        ];
      }
    }

    const badgeStyle = {
      safe: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      warn: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
      danger: "bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
      critical: "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
    }[dangerLevel];

    resultBox.innerHTML = `
      <div class="p-6 rounded-2xl border ${badgeStyle} transition-all">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-3.5 h-3.5 rounded-full ${dangerLevel === 'safe' ? 'bg-emerald-500' : dangerLevel === 'warn' ? 'bg-amber-500' : dangerLevel === 'danger' ? 'bg-orange-500' : 'bg-rose-600 animate-ping'}"></span>
            <h4 class="text-lg font-extrabold">${title}</h4>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-black/10 dark:bg-white/10">
            ${dangerLevel}
          </span>
        </div>
        <p class="text-sm mb-4 leading-relaxed">${analysis}</p>
        <div class="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl border border-black/5 dark:border-white/10">
          <h5 class="text-xs font-bold text-gray-900 dark:text-white uppercase mb-2">필수 실천 행동 수칙:</h5>
          <ul class="text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
            ${actionList.map(a => `<li class="flex items-start gap-1.5"><span class="font-bold text-indigo-500">▶</span><span>${a}</span></li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  tempSlider.addEventListener("input", simulate);
  lineageSelect.addEventListener("change", simulate);
  seasonRadio.forEach(r => r.addEventListener("change", simulate));
  potRadio.forEach(r => r.addEventListener("change", simulate));
  simulate();
}

// 7. 영농 캘린더 렌더링
function renderCalendar() {
  const container = document.getElementById("calendar-cards-container");
  if (!container) return;

  container.innerHTML = CALENDAR_DATA.map(c => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <div class="flex items-center justify-between mb-3">
        <span class="text-lg font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-xl">
          ${c.month}
        </span>
        <h4 class="text-sm font-bold text-gray-900 dark:text-white">${c.title}</h4>
      </div>
      <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 mb-3">
        ${c.tasks.map(t => `<li class="flex items-start gap-1.5"><span class="text-indigo-500">✔</span><span>${t}</span></li>`).join("")}
      </ul>
      <div class="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
        <i data-lucide="alert-circle" class="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400"></i>
        <span>${c.alert}</span>
      </div>
    </div>
  `).join("");
  lucide.createIcons();
}

// 8. 테마 및 빠른 실행 버튼
function initThemeAndQuickActions() {
  const themeToggle = document.getElementById("theme-toggle-btn");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }

  // 퀵 링크 동작
  window.navigateToTab = function(targetId) {
    const btn = document.querySelector(`.nav-tab-btn[data-target="${targetId}"]`);
    if (btn) btn.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
