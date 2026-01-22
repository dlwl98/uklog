# Uklog 블로그 프로젝트 컨텍스트

## 기술 스택

- **프레임워크**: Next.js 14.0.4
- **스타일링**: StyleX 0.5.1
- **데이터베이스**: MongoDB (Mongoose)
- **인증**: JWT (jose 라이브러리)
- **파일 저장**: AWS S3
- **배포**: Vercel

## 디자인 시스템

### 색상

| 용도 | 색상 코드 | 설명 |
|------|-----------|------|
| Primary | `#F3B95F` | 골든 오렌지, 주요 액션 버튼 |
| Primary Hover | `#E5A84D` | Primary의 hover 상태 |
| Text Primary | `#374151` | 본문 텍스트 |
| Text Secondary | `#6b7280` | 보조 텍스트 |
| Border | `#e5e7eb` | 입력 필드, 카드 테두리 |
| Background | `#fafafa` | 입력 필드 배경 |
| Drag Active | `#f97316` | 드래그 앤 드롭 활성 상태 |
| Drag Background | `#fff7ed` | 드래그 앤 드롭 배경 |
| Error | `red` | 에러 메시지 |

### 타이포그래피

- **폰트**: Noto Sans KR
- **제목 크기**: 1.5rem (24px)
- **본문 크기**: 1rem (16px)
- **작은 텍스트**: 0.8rem (12.8px)

### 간격

- 8px 그리드 시스템 사용
- 컴포넌트 간 간격: 24px
- 필드 그룹 내부 간격: 8px
- 버튼 패딩: 16px 32px (대형), 8px 16px (소형)

### 모서리

- 카드/입력 필드: 8px
- 버튼: 6-10px
- 태그/뱃지: 3px

## 프로젝트 구조

```
app/
├── (root)/           # 메인 레이아웃 영역
│   ├── login/        # 로그인 페이지
│   ├── posts/[id]/   # 게시글 상세
│   ├── write/        # 글쓰기 페이지
│   └── about/        # 소개 페이지
├── (route-handlers)/ # API 라우트
│   └── api/
│       ├── admin/    # 관리자 API
│       └── posts/    # 게시글 API
├── _components/      # 공통 컴포넌트
├── _context/         # React Context
├── _hooks/           # 커스텀 훅
├── _lib/             # 유틸리티, 서비스
└── _utils/           # 헬퍼 함수
```

## 환경 변수

```env
MONGODB_URI=           # MongoDB 연결 문자열
JWT_SECRET=            # JWT 서명 키
ADMIN_SALT=            # 비밀번호 해싱 솔트
ADMIN_HASHED_PASSWORD= # 해싱된 관리자 비밀번호
CRYPTO_ITERATIONS=     # PBKDF2 반복 횟수
AWS_REGION=            # AWS 리전
AWS_ACCESS_KEY_ID=     # AWS 액세스 키
AWS_SECRET_ACCESS_KEY= # AWS 시크릿 키
AWS_BUCKET_NAME=       # S3 버킷 이름
```

## 주요 컴포넌트

### EditForm

글쓰기/수정 폼 컴포넌트. 마크다운 에디터와 이미지 업로드 지원.

- 드래그 앤 드롭 이미지 업로드
- 실시간 미리보기
- 비공개 글 설정

### PostListItem

메인 페이지 글 목록 아이템.

- 비공개 글에 "작성중" 뱃지 표시 (Primary 색상)

### LoginForm

관리자 로그인 폼.

- 단일 비밀번호 인증
- 로그인 성공 시 토스트 알림

## 스타일 가이드

### StyleX 사용법

```tsx
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    backgroundColor: {
      default: '#F3B95F',
      ':hover': '#E5A84D',
    },
    transition: 'background-color 0.2s ease',
  },
});

// 사용
<button {...stylex.props(styles.button)}>버튼</button>
```

### 공통 스타일 (global.stylex.ts)

- `flex.center`: 중앙 정렬 flexbox
- `flex.row`: 가로 정렬 flexbox
- `flex.column`: 세로 정렬 flexbox
- `button.default`: 기본 버튼 스타일

### StyleX 제한사항

StyleX는 일부 CSS 속성에 대해 엄격한 제한이 있음:

| 속성 | 허용되지 않음 | 대안 |
|------|---------------|------|
| `flex` | `flex: 1` (숫자) | `flexGrow: 1`, `flexShrink: 0`, `flexBasis: 'auto'` 개별 사용 |

```tsx
// ❌ 잘못된 사용
const styles = stylex.create({
  container: {
    flex: 1,  // Error: flex value must be one of: string literal, null, initial, inherit, unset
  },
});

// ✅ 올바른 사용
const styles = stylex.create({
  container: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});
```

## PR 및 배포 프로세스

### Vercel 빌드 확인 (필수)

PR을 올리면 Vercel이 자동으로 빌드를 실행함. **PR 머지 전 반드시 빌드 성공 여부를 확인해야 함.**

1. PR 페이지에서 Checks 섹션 확인
2. Vercel 상태가 ✅ 인지 확인
3. 실패 시 "Details" 링크 클릭하여 에러 로그 확인
4. 빌드 에러 수정 후 다시 푸시

```
PR Status:
✅ Vercel – Deployment successful  → 머지 가능
❌ Vercel – Deployment has failed  → 에러 수정 필요
```

### 빌드 실패 시 확인 사항

1. StyleX 문법 오류 (위 제한사항 참고)
2. TypeScript 타입 에러
3. 누락된 import/export
4. 환경 변수 누락

## Node.js 버전

- 최소 요구 버전: 24.0.0
- `.nvmrc` 파일에 명시됨
