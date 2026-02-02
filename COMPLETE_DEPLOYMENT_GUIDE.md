# 🚀 VIEW-MEDIA 배포 및 설정 완벽 가이드

---

## 📌 목차

1. [호스팅 배포 (Vercel)](#1-호스팅-배포-vercel)
2. [Supabase 설정](#2-supabase-설정)
3. [Google Ads 확인](#3-google-ads-확인)
4. [전체 체크리스트](#4-전체-체크리스트)

---

## 1️⃣ 호스팅 배포 (Vercel)

### ❌ 젠스파크는 사용 불가!

**이유:**
- Next.js는 **서버 사이드 렌더링(SSR)** 필요
- 젠스파크는 정적 HTML만 지원
- Supabase 데이터베이스 연동 불가

### ✅ Vercel 배포 (추천, 무료)

#### 1단계: GitHub 저장소 생성

```bash
# 프로젝트 폴더에서
git init
git add .
git commit -m "Initial commit: VIEW-MEDIA full-stack landing page"

# GitHub에 새 저장소 생성 후
git remote add origin https://github.com/your-username/viewmedia-landing.git
git branch -M main
git push -u origin main
```

#### 2단계: Vercel 연결

1. **[Vercel](https://vercel.com) 접속**
2. **"New Project"** 클릭
3. **GitHub 연결** → 저장소 선택
4. **"Import"** 클릭

#### 3단계: 환경 변수 추가

**Environment Variables** 섹션에서:

```bash
# Supabase (나중에 추가)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Formspree (선택)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

#### 4단계: 배포!

**"Deploy"** 버튼 클릭 → 2-3분 대기

**완료!**
```
✅ 메인 페이지: https://viewmedia-landing.vercel.app
✅ 관리자 페이지: https://viewmedia-landing.vercel.app/admin
```

---

## 2️⃣ Supabase 설정

### 필요한 정보 (3가지)

#### A. Supabase 프로젝트 생성

1. **[Supabase](https://supabase.com) 접속**
2. **"New Project"** 클릭
3. 정보 입력:
   ```
   Organization: 개인 계정 선택
   Name: viewmedia-portfolio
   Database Password: (강력한 비밀번호 생성 - 꼭 저장!)
   Region: Northeast Asia (Seoul) ← 한국 서버!
   ```
4. **"Create new project"** 클릭 (2-3분 소요)

#### B. API Keys 확인

프로젝트 생성 완료 후:

1. 좌측 메뉴 → **⚙️ Settings** → **API**
2. 아래 3개 값 복사:

```bash
# 1. Project URL
https://abcdefghijk.supabase.co

# 2. Project API keys → anon public
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...

# 3. Project API keys → service_role (Show 클릭)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

⚠️ **service_role key는 절대 공개하지 마세요!**

#### C. 데이터베이스 테이블 생성

1. 좌측 메뉴 → **🛢️ SQL Editor**
2. **"New query"** 클릭
3. 아래 SQL 복사 후 붙여넣기:

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

-- 인덱스 생성
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

-- RLS (Row Level Security) 활성화
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용
CREATE POLICY "Public read access" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
```

4. **"Run"** 또는 **Ctrl+Enter** 실행
5. ✅ **"Success. No rows returned"** 확인

#### D. Storage Bucket 생성

1. 좌측 메뉴 → **🗂️ Storage**
2. **"New bucket"** 클릭
3. 설정:
   ```
   Name: images
   Public bucket: ON (체크!) ← 중요!
   ```
4. **"Create bucket"** 클릭

#### E. 샘플 데이터 200개 생성 (선택)

SQL Editor에서 실행:

```sql
-- 샘플 200개 포트폴리오 자동 생성
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

-- 카테고리별 개수 업데이트
UPDATE categories c
SET count = (SELECT COUNT(*) FROM portfolios p WHERE p.category = c.slug);
```

#### F. 환경 변수 설정

**로컬 개발용** (`.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Vercel 배포용:**
1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 위 3개 변수 추가
4. **"Redeploy"** 클릭

---

## 3️⃣ Google Ads 확인

### ✅ 이미 적용 완료!

Google Ads 태그가 자동으로 추가되었습니다:

#### A. 적용된 위치

**파일:** `app/layout.tsx`
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17925811977"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17925811977');
</script>
```

#### B. 전환 추적 기능

**자동 추적되는 이벤트:**
- ✅ **문의 폼 제출** (Contact Form)
- ✅ **전화 클릭** (+82-1644-4262)
- ✅ **WhatsApp 클릭** (+82-10-2839-3313)
- ✅ **페이지뷰**

**파일:** `lib/analytics.ts` - 전환 추적 함수

#### C. Google Ads 확인 방법

1. **Google Ads 대시보드** → **도구 및 설정** → **전환**
2. 24시간 내 테스트 전환 데이터 확인
3. "테스트" 버튼으로 태그 설치 확인

#### D. 유럽(EEA) 사용자 동의 모드 (선택)

**필요 시 추가 (GDPR 준수):**
```javascript
// app/layout.tsx에 추가
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied'
});
```

---

## 4️⃣ 전체 체크리스트

### ✅ 완료 확인

#### Vercel 배포
- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel 프로젝트 생성
- [ ] 배포 완료 (URL 확인)
- [ ] 환경 변수 추가 (Supabase)
- [ ] 재배포 완료

#### Supabase 설정
- [ ] Supabase 프로젝트 생성
- [ ] API Keys 3개 복사
- [ ] 데이터베이스 테이블 생성 (SQL 실행)
- [ ] Storage Bucket 생성 (images, Public)
- [ ] 샘플 데이터 200개 삽입 (선택)
- [ ] 환경 변수 설정 (.env.local + Vercel)

#### Google Ads
- [x] Google Ads 태그 추가 (자동 완료)
- [x] 전환 추적 함수 추가 (자동 완료)
- [ ] Google Ads 대시보드에서 태그 확인
- [ ] 테스트 전환 데이터 확인

#### 기능 테스트
- [ ] 메인 페이지 접속 확인
- [ ] 언어 전환 (12개) 테스트
- [ ] 포트폴리오 갤러리 확인
- [ ] 검색 및 필터 테스트
- [ ] 관리자 페이지 (/admin) 접속
- [ ] 포트폴리오 추가/수정/삭제 테스트
- [ ] 문의 폼 제출 테스트
- [ ] 전화/WhatsApp 클릭 테스트

---

## 🎯 다음 단계

### 1. 지금 당장 (5분)
1. Supabase 프로젝트 생성
2. API Keys 복사
3. `.env.local` 설정
4. `npm run dev` 테스트

### 2. 오늘 중 (30분)
5. GitHub 저장소 생성 및 푸시
6. Vercel 배포
7. Supabase 테이블 생성 (SQL 실행)
8. Storage Bucket 생성

### 3. 이번 주 (2시간)
9. 샘플 데이터 200개 삽입
10. 관리자 페이지에서 실제 포트폴리오 추가
11. 실제 이미지 업로드
12. Google Ads 전환 데이터 확인

---

## 📞 문제 해결

### Q1: Vercel 배포가 실패해요!
**A:** 환경 변수 확인 → Supabase Keys 정확히 입력했는지 확인

### Q2: 포트폴리오가 안 보여요!
**A:** Supabase 테이블 생성 확인 → SQL 스크립트 재실행

### Q3: 이미지 업로드가 안 돼요!
**A:** Storage Bucket이 **Public**으로 설정되었는지 확인

### Q4: Google Ads 전환이 안 잡혀요!
**A:** 24시간 대기 → Google Ads 대시보드에서 "테스트" 실행

---

## 🎉 완료!

모든 설정이 완료되면:

1. **메인 페이지**: https://viewmedia-landing.vercel.app
2. **관리자 페이지**: https://viewmedia-landing.vercel.app/admin
3. **Google Ads 전환 추적**: 자동 작동
4. **200+ 포트폴리오**: 검색, 필터, 무한스크롤
5. **12개 언어**: 실시간 전환
6. **SNS 피드**: Instagram/YouTube/Blog

**축하합니다!** 🚀

---

© 2026 VIEW-MEDIA Co., Ltd.
