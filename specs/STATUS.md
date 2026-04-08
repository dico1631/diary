# 구현 진행 상태

이 문서는 현재 스펙 기준으로 무엇이 구현되었고 무엇이 아직 남아 있는지 빠르게 확인하기 위한 요약판이다.

## 기준

- 기능 요구사항 충족 여부는 `specs/features/*.md`의 `Acceptance Criteria`로 확인한다.
- 구현 단위 진행 여부는 `specs/tasks/*.md`의 `Done Criteria`로 확인한다.
- 이 문서는 현재 MVP 범위를 중심으로 요약한다.

## MVP 기능 상태

- [x] 인증
- [ ] 연간 목표 리스트업 및 분류
- [ ] 연간 만다라트
- [ ] 월간 목표 리스트업 및 분류
- [ ] 월간 목표와 연간 목표 연결
- [ ] 주간 목표 조회 / 작성 / 수정
- [ ] 주간 목표와 월간 목표 연결

## PROJECT_SPEC 상위 진행 상태

- [ ] 6.1 연간 목표 리스트업 및 분류
- [ ] 6.2 연간 만다라트
- [ ] 6.3 소형 만다라트
- [ ] 6.4 월간 목표 리스트업 및 분류
- [ ] 6.5 월간 감정 저널
- [ ] 6.6 주간 목표
- [ ] 6.6.1 주간 인사이트
- [ ] 6.7 해빗 트래커
- [ ] 6.8 일일 피드백
- [ ] 6.9 일일 일기

## MVP Task 상태

- [x] `01-auth-foundation`
- [ ] `02-weekly-goals-crud`
- [ ] `08-monthly-goals-crud`
- [ ] `09-year-planning-foundation`
- [x] `10-mvp-scope`

## Post-MVP 기능 상태

- [ ] 소형 만다라트
- [ ] 월간 감정 저널
- [ ] 해빗 트래커
- [ ] 주간 인사이트
- [ ] 일일 일기
- [ ] 일일 피드백
- [ ] 대시보드
- [ ] 분석 기능
- [ ] 분석 기반 피드백 / 추천

## Post-MVP Task 상태

- [ ] `03-habit-tracker-crud`
- [ ] `04-daily-diary-crud`
- [ ] `05-daily-feedback-crud`
- [ ] `06-weekly-insight-crud`
- [ ] `07-monthly-mood-log-crud`

## 업데이트 규칙

1. `plan`: 관련 spec과 task 범위를 먼저 확인한다.
2. `implementation`: 코드를 구현한다.
3. `refactor`: 필요한 구조 정리를 수행한다.
4. `test-gate`: 빌드, 테스트, 수동 검증을 통과한다.
5. `completion-check`: 그 다음에만 아래 순서로 체크한다.

completion-check 순서:

1. 해당 task 문서의 `Done Criteria`
2. 해당 feature 문서의 `Acceptance Criteria`
3. `PROJECT_SPEC.md`의 상위 체크박스
4. `specs/STATUS.md`의 요약 체크박스

중요:

- 구현만 끝난 상태에서는 체크하지 않는다.
- 리팩토링과 검증이 끝난 뒤에만 완료 처리한다.
