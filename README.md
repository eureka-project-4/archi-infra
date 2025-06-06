# 프로젝트 초기 세팅 가이드

이 저장소는 `archi-admin` 등 하위 레포를 **Git Submodule**로 관리함.  
아래 명령어를 따라 로컬 개발 환경을 세팅

---

## 1. 저장소 클론 & 서브모듈 초기화

```bash
git clone https://github.com/eureka-project-4/archi-infra.git
cd archi-infra
git submodule update --init --recursive
```

---

## 2. 서브모듈 브랜치 체크아웃 (예: develop)

```bash
cd archi-admin
git checkout develop
git pull origin develop
cd ..
```

> `archi-admin`은 독립적인 레포이므로 브랜치 변경이 필요

---

## 3. 로컬 환경 설정

`application-local.yml` 또는 `.env` 파일을 각자의 환경에 맞게 작성해주세요.  
(공유한 샘플 템플릿 확인)

---

## ▶️ 4. 프로젝트 실행 (Docker Compose 기준)

```bash
docker compose up --build
```

---

## 기타 명령어

### 서브모듈 최신화

```bash
git submodule update --remote
```

> 또는 각 서브모듈 디렉토리(`archi-admin`)에 들어가 직접 pull

---

## 참고 사항

- `archi-admin`,`archi-service` 폴더는 실제 레포지토리. 해당 폴더 내에서 개발 및 PR 진행
- 상위 레포 (`archi-infra`)는 전체 인프라 및 배포 구성용임
- 팀원은 `archi-admin`, `archi-service`만 직접 수정