# 🫐 블루베리 스마트 재배 관리 & 품종 도감 (Blueberry Farm Care)

> **Paweł Huryn의 `create-prd` 스킬 표준 8섹션 템플릿에 따라 기획 및 구현된 올인원 블루베리 스마트 영농 웹 애플리케이션**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRD Standard](https://img.shields.io/badge/PRD-phuryn%2Fcreate--prd-emerald)](./PRD.md)
[![Status](https://img.shields.io/badge/Release-v1.0%20MVP-indigo)](#)

---

## 📖 프로젝트 개요

블루베리는 천근성 산성 토양(pH 4.2~5.0)을 선호하는 대표적인 고소득 과수이지만, 뿌리털이 없고 기후 적응성(저온요구시간 및 내한성)이 까다로워 수종 선정 실패나 동해·냉해로 인한 고사율이 높은 작물입니다.

본 프로젝트는 상업 과원 농가부터 베란다·옥상 화분 재배자까지 손쉽게 활용할 수 있도록 **14대 핵심 품종 도감**, **화분 배지 배합 및 수화 계산기**, **토양 pH 진단기**, **기온별 동해·냉해 위험도 시뮬레이터**, **연간 생육 주기별 캘린더**를 하나의 모던 반응형 웹앱으로 통합하였습니다.

---

## 📂 프로젝트 구성

* [`PRD.md`](./PRD.md) : 제품 요구사항 문서 (8섹션: Summary, Contacts, Background, Objective, Market Segments, Value Propositions 6-part JTBD, Solution, Release)
* [`index.html`](./index.html) : 모바일 최적화 웹앱 인터페이스 (Tailwind CSS, Lucide Icons)
* [`app.js`](./app.js) : 14대 품종 DB, 수화/배지 계산 알고리즘, 동해 위험도 시뮬레이션 엔진
* [`.agent/skills/create-prd/SKILL.md`](./.agent/skills/create-prd/SKILL.md) : GitHub `phuryn/pm-skills`에서 가져온 제품 기획 에이전트 스킬

---

## ✨ 핵심 기능 (Features)

### 1. 🍇 14대 대표 품종 도감 & 다차원 필터
* **북부 하이부시**: 듀크, 스파르탄, 블루크롭, 챈들러, 드레이퍼, 엘리엇
* **남부 하이부시**: 스타, 오닐, 미스티, 레거시, 선샤인블루
* **래빗아이**: 파우더블루, 티프블루, 오크락코니
* 당도(Brix), 저온요구시간(h), 내한 한계온도(℃), 자가결실성, 추천 수분수 조합 상세 제공

### 2. 🧪 화분 배지 배합 & 수화(물먹이기) 계산기
* 표준 레시피: **무조정 피트모스 50% + 펄라이트 25% + 소나무 파쇄 바크 25%**
* 화분 규격(25L, 50L, 80L, 100L 등) 및 수량에 맞춘 자재별 필요 부피(L)와 포대 수 자동 환산
* 발수성 방지를 위한 **미온수 수화량 계산** 및 수분 확인법 가이드

### 3. 🧪 토양 pH 진단 & 비배 3대 절대 원칙
* 측정 pH에 따른 상태 진단 (과산성 / 4.2~5.0 최적 / 경계 / 알칼리화 위험)
* 질산태 질소 금지 및 **암모늄태 질소(황산암모늄/유안)** 시비 원칙
* 철(Fe) 결핍 황화현상 시 **킬레이트 철(Fe-EDDHA)** 처방 안내

### 4. ❄️ 기온별 동해·냉해 위험도 시뮬레이터
* **봄철 늦서리 (3~4월)**: -2℃ 이하 꽃눈 동결 방지를 위한 **살수빙결법 (응고잠열 80cal/g 방출 원리)** 가이드
* **겨울 혹한기 (12~2월)**: 계통별 내한 한계온도 및 화분 급랭(+7℃ 가산) 위험 경보
* 주간부 친환경 백색 수성페인트(1:1) 도포 및 **11월 하순 30~40mm 동해방지 관수(Winterizing)** 수칙 제시

### 5. 📅 연간 12개월 영농 캘린더
* 월별 핵심 영농 작업 (전정 3단계, 수확 골든타임 06~10시, 8월 질소 중단 등)

---

## 🚀 실행 방법 (Quick Start)

본 프로젝트는 의존성 설치 없이 웹 브라우저에서 바로 실행할 수 있습니다.

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/ksj7240-byte/blueberry-farm-care.git
   cd blueberry-farm-care
   ```
2. `index.html` 파일을 더블 클릭하여 웹 브라우저(Chrome, Edge, Safari 등)에서 엽니다.
3. 또는 간단한 로컬 웹 서버로 실행할 수 있습니다:
   ```bash
   npx serve .
   # 또는
   python -m http.server 8000
   ```

---

## 📄 라이선스
MIT License
