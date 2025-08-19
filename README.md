# 유독, 나에게 딱맞는 AI 챗봇 : Archi

### 프로젝트 목표
- (서비스 개요)LG유플러스의 구독 서비스 ‘유독’에 AI 챗봇 ‘ArchI’를 통합하여, 사용자의 실시간 대화와 패턴을 분석해 맞춤형 통신 요금제 조합을 제안하는 서비스를 제공한다. 
- (기술적 목표)단순한 설문 기반 추천을 넘어서, 자연어 대화를 통해 사용자의 니즈를 파악하고 요금제-부가서비스-라이프혜택의 조합을 동적으로 추천한다. 또한, 대화 과정에서 자동으로 업데이트되는 성향 태그를 통해 지속적으로 개인화 수준을 높여 고도화된 추천 시스템 구현을 목표로 한다.
- (사용자 경험)사용자는 복잡한 요금제 비교없이도 챗봇과의 자연스러운 대화만으로 자신에게 최적화된 통신 서비스 조합을 발견하고, 언제든 변화하는 라이프스타일에 맞춰 유연하게 조합을 변경할 수 있는 경험을 제공받는다.
  
---
## Intro

## Documents

- 화면 설계 문서 : https://docs.google.com/presentation/d/1MF9kqc2uC8ufsfCQxmTVAksOE3487MZQOAWbavg3DxQ/edit?usp=sharing
- 화면 UI 설계 초안 : https://v0-archi-eight.vercel.app/
- 기획 문서 : https://docs.google.com/spreadsheets/d/1oR081MsewI_3JfcgwxjMXWXAnLtFYInT10Dtbs9m_Rc/edit?usp=sharing

- 프로젝트 전체 구조 확인 : [Archi-Infra](https://github.com/eureka-project-4/archi-infra)

## ER Diagram

  <img width="1288" alt="스크린샷 2025-06-24 오전 10 00 01" src="https://github.com/user-attachments/assets/d8349bc3-f8af-4621-a748-b1d5afeb0e64" />


## Stack

## SW Architecture

  <img width="804" alt="image" src="https://github.com/user-attachments/assets/7e340b41-3527-4c95-90a1-a9a6f44a1e5e" />

## Member & Role

|  이름  | 역할 | 주요 담당 업무 및 책임  | GitHub | 
| ---- | ---- | ------ | ------ |
| **한세영 (팀장)** | 팀장, A팀 리더 | 전체 기획·설계 총괄, WebSocket 기반 챗봇 시스템 및 Redis Stream 구조 설계, AI 서버·백엔드 연동 구조 구현 | https://github.com/1seyoung |
| **손민혁** | AI 기술 리더 | 파이썬 기반 AI RAG 구현, 멀티턴 대응을 위한 대화 메모리 및 메시지 타입 분류기 설계, 챗봇 시스템 검증 및 이미지 컨슈머 개발. 서버 응답 품질 향상을 위한 프롬프트 구조 설계 및 개선 수행 | https://github.com/Sonminhyeok |
| **이본규** | QA 담당, 성향 도메인 AI 연동 담당 | 사용자 이미지 업로드 시 AI 서버가 성향 태그를 추출해 DB에 반영하는 로직 구현 , 퓨샷러닝을 활용한 프롬프트 설계 및 AI 응답 품질 개선, ERD 설계 , FE·BE 연동 테스트 담당, Websocket 세팅 | https://github.com/lbk00 |
| **장현서** | B팀 리더, 성능 테스트 및 AI 클린봇 담당 | 기본 CRUD 구현 총괄 및 B팀 코드 리뷰 . Spring AI 를 활용한 리뷰 클린봇 및 요약 기능 구현, K6를 이용한 기능 성능 테스트 진행 , ERD 설계 및 MVP 구현을 위한 더미데이터 생성| https://github.com/Jang-GO |
| **김건택** | 백오피스 담당 , 추천 도메인 AI 연동 담당 | 백엔드 서버 기반 추천 시스템 개발 및 추천 결과의 AI 고도화. 어드민 서버의 전반적인 기능 구현 및 프론트엔드 개발, 계약 스케줄링 보조 | https://github.com/guntaek |
| **김지산** | 기획 보조 , 성향 도메인 담당자 | 사용자 응답 기반 성향 테스트 로직을 설계 및 구현하고, 비트 마스킹을 활용해 사용자 성향을 저장 및 관리하는 기능을 개발 , 상품 데이터 샘플링 및 K6를 활용한 기능 성능 테스트 수행 | https://github.com/kjs254 |
| **박기환** | 계약 도메인 담당자 , AI 기반 상품 광고 생성 | JWT 를 이용한 인증·인가 프로세스 구축 , Spring AI 를 활용한 사용자 맞춤 광고 생성 , 이슈 관리 및 계약 갱신 스케줄링 구현 | https://github.com/GihwanPark |


## Detailed Features

| Repository | GitHub Link |
| -------- | ------------ |
| **Archi-Infra** | [https://github.com/eureka-project-4/archi-infra](https://github.com/eureka-project-4/archi-infra) |
| **Archi-Service** | [https://github.com/eureka-project-4/Archi-Service](https://github.com/eureka-project-4/Archi-Service) |
| **Archi-AI** | [https://github.com/eureka-project-4/Archi-AI](https://github.com/eureka-project-4/Archi-AI) |
| **Archi-Admin** | [https://github.com/eureka-project-4/Archi-Admin](https://github.com/eureka-project-4/Archi-Admin) |
| **Archi-Front** | [https://github.com/eureka-project-4/archi-front](https://github.com/eureka-project-4/archi-front) |

> 각 레포지토리는 Archi 프로젝트의 모듈별 기능을 담당하며, 협업 및 버전 관리를 위해 분리되어 관리됩니다.


## 해결하고자 하는 문제
- (선택의 복잡성)구독 선택지가 많아 선택에 오랜 시간이 소요되는 문제
- (정보 접근성) 새로운 구독 혜택 출시 시 기존 구독자의 정보 접근성 부족
- (기술적 한계) 기존 챗봇(AI홀맨)의 룰-베이스 단순 상담의 한계

## 기대효과
- (운영 효율성) 기존 챗봇 대비 유연한 대화 흐름으로 사용자 신뢰도 향상 및 상담사 업무 지원 솔루션으로 확장 가능
- (데이터 활용) 성향 기반 데이터 마케팅 및 요금제 / 멤버십 조합 인사이트 확보


