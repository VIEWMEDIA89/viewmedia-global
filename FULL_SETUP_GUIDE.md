# 🚀 VIEW-MEDIA 풀스택 랜딩페이지 - 최종 설정 가이드

---

## ✅ 완성된 기능

### 1단계: Services 섹션 확장 ✅
- ✅ 3D 비주얼라이제이션
- ✅ A to Z 기획
- ✅ VIP 의전 대행
- ✅ MICE 솔루션
- ✅ 한국 비즈니스 진출 지원

### 2단계: SNS Feed 섹션 ✅
- ✅ 인스타그램 피드 (탭 전환)
- ✅ 유튜브 최신 영상
- ✅ 블로그 포스트
- ✅ 실시간 연동 가이드 포함

### 3단계: DB + 포트폴리오 갤러리 ✅
- ✅ Supabase 데이터베이스 구조
- ✅ 200+ 포트폴리오 관리
- ✅ 카테고리 필터링
- ✅ 검색 기능
- ✅ 무한 스크롤
- ✅ 관리자 페이지 (CRUD)

---

## 📦 설치 및 실행

### 1단계: 패키지 설치
```bash
npm install
```

### 2단계: Supabase 프로젝트 생성

1. **[Supabase](https://supabase.com) 가입**
2. **New Project** 클릭
3. 프로젝트 생성 (무료 티어 OK)
4. **Project URL**과 **API Keys** 복사

### 3단계: 환경 변수 설정

`.env.local` 파일 생성:
```bash
cp .env.example .env.local
```

내용 수정:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4단계: Supabase 테이블 생성

Supabase Dashboard → SQL Editor에서 실행:

```sql
-- portfolios 테이블
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  client_name VARCHAR(255),
  event_date DATE,
  location VARCHAR(255),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_category ON portfolios(category);
CREATE INDEX idx_event_date ON portfolios(event_date DESC);
CREATE INDEX idx_featured ON portfolios(featured);

-- categories 테이블
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_ko VARCHAR(100) NOT NULL,
  name_ja VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  slug VARCHAR(100) UNIQUE NOT NULL,
  count INTEGER DEFAULT 0
);

-- 초기 카테고리 데이터
INSERT INTO categories (name_en, name_ko, name_ja, icon, slug) VALUES
('Conference', '컨퍼런스', 'カンファレンス', '🎤', 'conference'),
('Concert', '콘서트', 'コンサート', '🎵', 'concert'),
('Corporate Event', '기업 행사', '企業イベント', '🏢', 'corporate'),
('Exhibition', '전시회', '展示会', '🎨', 'exhibition'),
('Musical', '뮤지컬', 'ミュージカル', '🎭', 'musical'),
('Festival', '페스티벌', 'フェスティバル', '🎪', 'festival'),
('VIP Protocol', 'VIP 의전', 'VIP接遇', '👔', 'vip'),
('3D Visualization', '3D 비주얼라이제이션', '3Dビジュアライゼーション', '🎨', '3d-viz');

-- RLS (Row Level Security) 설정
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용
CREATE POLICY "Public read access" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
```

### 5단계: Supabase Storage 설정

1. Dashboard → Storage → New Bucket
2. Bucket 이름: `images`
3. Public Bucket: **ON** (체크)
4. Create Bucket

### 6단계: 샘플 데이터 삽입 (선택 사항)

```sql
-- 샘플 200개 포트폴리오 생성
DO $$
DECLARE
  categories TEXT[] := ARRAY['conference', 'concert', 'corporate', 'exhibition', 'musical', 'festival', 'vip', '3d-viz'];
  clients TEXT[] := ARRAY['Samsung', 'Hyundai', 'LG', 'SK Telecom', 'APEC', 'G20', 'BTS', 'BLACKPINK', 'Naver', 'Kakao'];
  locations TEXT[] := ARRAY['Seoul', 'Busan', 'Incheon', 'COEX', 'KINTEX'];
  i INTEGER;
BEGIN
  FOR i IN 1..200 LOOP
    INSERT INTO portfolios (
      title,
      description,
      category,
      client_name,
      event_date,
      location,
      image_url,
      tags,
      featured
    ) VALUES (
      'Project ' || i || ' - ' || clients[1 + (i % 10)],
      'Professional event production with LED walls, AV equipment, and full technical support for ' || clients[1 + (i % 10)],
      categories[1 + (i % 8)],
      clients[1 + (i % 10)],
      CURRENT_DATE - (i || ' days')::INTERVAL,
      locations[1 + (i % 5)] || ', Korea',
      'https://images.unsplash.com/photo-' || (1540575467063 + i) || '?w=800&q=80',
      ARRAY['LED', 'Event', 'Production', 'Korea'],
      (i % 20 = 0)
    );
  END LOOP;
END $$;

-- 카테고리별 카운트 업데이트
UPDATE categories c
SET count = (SELECT COUNT(*) FROM portfolios p WHERE p.category = c.slug);
```

### 7단계: 개발 서버 실행

```bash
npm run dev
```

브라우저: **http://localhost:3000**

---

## 🎯 페이지 구성

### 메인 페이지 (`/`)
1. Hero - 언어 선택기 (12개 언어)
2. **Services - 8개 서비스** ✨ 업데이트됨
3. Why Us - 4개 특징
4. Portfolio Gallery - 200+ 프로젝트 (필터, 검색, 무한스크롤) ✨ 신규
5. **Social Feed - 인스타/유튜브/블로그** ✨ 신규
6. Process - 5단계 워크플로우
7. Contact - 문의 폼
8. Footer

### 관리자 페이지 (`/admin`)
- ✅ 포트폴리오 목록 (테이블 뷰)
- ✅ 통계 대시보드
- ✅ 포트폴리오 추가/수정/삭제
- ✅ 이미지 업로드 (Supabase Storage)
- ✅ Featured 설정

---

## 🔧 주요 기능 사용법

### 1. 포트폴리오 추가

관리자 페이지 접속:
```
http://localhost:3000/admin
```

1. **"Add New Portfolio"** 버튼 클릭
2. 이미지 업로드 (자동으로 Supabase Storage에 저장)
3. 제목, 설명, 카테고리, 클라이언트 입력
4. 날짜, 위치 선택
5. Featured 체크 (홈페이지 상단 노출)
6. **"Create Portfolio"** 클릭

### 2. 포트폴리오 검색 & 필터

메인 페이지:
- **검색창**: 프로젝트명, 클라이언트, 태그로 검색
- **카테고리 버튼**: Conference, Concert, Corporate 등 필터링
- **무한 스크롤**: 자동으로 추가 로드

### 3. SNS Feed 연동

#### 인스타그램 (실제 연동)
1. [EmbedSocial](https://embedsocial.com) 가입
2. Instagram 계정 연결
3. Widget 코드 복사
4. `components/SocialFeed.tsx` → `InstagramFeed` 함수에 붙여넣기

#### 유튜브 (실제 연동)
1. [Google Cloud Console](https://console.cloud.google.com) → YouTube Data API v3 활성화
2. API Key 생성
3. `.env.local`에 추가:
   ```
   YOUTUBE_API_KEY=your_api_key
   YOUTUBE_CHANNEL_ID=your_channel_id
   ```
4. `components/SocialFeed.tsx` → `YouTubeFeed` 함수에서 API 호출

---

## 📊 데이터베이스 구조

### portfolios 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID | 고유 ID |
| title | VARCHAR | 프로젝트 제목 |
| description | TEXT | 상세 설명 |
| category | VARCHAR | 카테고리 (conference, concert 등) |
| client_name | VARCHAR | 고객사명 |
| event_date | DATE | 행사 날짜 |
| location | VARCHAR | 장소 |
| image_url | TEXT | 이미지 URL |
| tags | TEXT[] | 검색 태그 배열 |
| featured | BOOLEAN | 대표 프로젝트 여부 |
| views | INTEGER | 조회수 |

### categories 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | SERIAL | 고유 ID |
| name_en/ko/ja | VARCHAR | 다국어 이름 |
| icon | VARCHAR | 이모지 아이콘 |
| slug | VARCHAR | URL 슬러그 |
| count | INTEGER | 포트폴리오 개수 |

---

## 🎨 커스터마이징

### Services 아이콘 변경
`components/Services.tsx`:
```typescript
const services = [
  {
    icon: '📺', // 이모지 변경
    key: 'led',
  },
  // ...
];
```

### 카테고리 추가
Supabase SQL Editor:
```sql
INSERT INTO categories (name_en, name_ko, name_ja, icon, slug) VALUES
('Wedding', '웨딩', 'ウェディング', '💒', 'wedding');
```

### SNS 계정 정보 수정
`components/SocialFeed.tsx`:
```typescript
const SNS_ACCOUNTS = {
  instagram: 'viewmedia_official', // 실제 계정명
  youtube: 'UCxxxxxxxxxxx', // 실제 채널 ID
  blog: 'https://blog.view-media.kr' // 실제 블로그 URL
};
```

---

## 🚀 배포 (Vercel)

### 1단계: GitHub 푸시
```bash
git add .
git commit -m "Full-stack portfolio with Supabase"
git push
```

### 2단계: Vercel 연결
1. [Vercel](https://vercel.com) 접속
2. "New Project" → GitHub 저장소 선택
3. **Environment Variables** 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
4. Deploy 클릭

### 3단계: 배포 완료!
- URL: `https://viewmedia-landing.vercel.app`
- 관리자: `https://viewmedia-landing.vercel.app/admin`

---

## 📋 체크리스트

### 필수 작업
- [ ] Supabase 프로젝트 생성
- [ ] 테이블 생성 (portfolios, categories)
- [ ] Storage Bucket 생성 (images)
- [ ] 환경 변수 설정 (.env.local)
- [ ] 샘플 데이터 200개 삽입
- [ ] 개발 서버 실행 및 테스트
- [ ] 관리자 페이지 테스트

### 선택 작업
- [ ] 인스타그램 실제 연동 (EmbedSocial)
- [ ] 유튜브 API 연동
- [ ] 블로그 RSS 연동
- [ ] Google Analytics 추가
- [ ] Formspree 폼 연동

---

## 🎯 예상 효과

| 항목 | 기대 효과 |
|------|----------|
| **포트폴리오 관리** | 200+ 프로젝트 체계적 관리 |
| **검색 & 필터** | 고객이 원하는 프로젝트 즉시 찾기 |
| **무한 스크롤** | 모든 프로젝트 끊김 없이 탐색 |
| **관리자 페이지** | 비개발자도 쉽게 업데이트 |
| **SNS 연동** | 실시간 최신 콘텐츠 자동 표시 |
| **다국어 지원** | 12개 언어로 글로벌 고객 유치 |

---

## 📞 지원

- 📧 viewmedia@view-media.kr
- 📞 +82-1644-4262
- 💬 WhatsApp: +82-10-2839-3313

---

## 🎉 완성!

**모든 기능이 구현된 풀스택 랜딩페이지가 완성되었습니다!**

✅ Services 8개로 확장
✅ SNS Feed 섹션 추가
✅ Supabase DB + 200+ 포트폴리오
✅ 관리자 페이지 (CRUD)
✅ 검색, 필터, 무한스크롤
✅ 12개 언어 지원
✅ SEO 최적화

**지금 바로 시작하세요!** 🚀

```bash
npm install
npm run dev
```

---

© 2026 VIEW-MEDIA Co., Ltd. All rights reserved.
