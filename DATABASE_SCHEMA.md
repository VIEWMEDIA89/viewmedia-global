# VIEW-MEDIA 포트폴리오 DB 구조 설계

## 📊 Supabase 테이블 스키마

### 1. portfolios 테이블

```sql
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
  tags TEXT[], -- 검색 태그 배열
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_category ON portfolios(category);
CREATE INDEX idx_event_date ON portfolios(event_date DESC);
CREATE INDEX idx_featured ON portfolios(featured);
CREATE INDEX idx_created_at ON portfolios(created_at DESC);
```

### 2. categories 테이블

```sql
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
```

### 3. portfolio_images 테이블 (다중 이미지)

```sql
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_id ON portfolio_images(portfolio_id);
```

---

## 🔧 Supabase 설정 파일

`.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📦 패키지 설치

```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
```

---

## 🔐 Row Level Security (RLS) 설정

```sql
-- 모든 사용자가 읽기 가능
CREATE POLICY "Public read access"
ON portfolios FOR SELECT
USING (true);

-- 관리자만 쓰기 가능 (나중에 auth 추가 시)
CREATE POLICY "Admin write access"
ON portfolios FOR ALL
USING (auth.role() = 'admin');
```

---

## 📊 샘플 데이터 (200개 생성 스크립트)

```sql
-- 샘플 포트폴리오 데이터 생성
DO $$
DECLARE
  categories TEXT[] := ARRAY['conference', 'concert', 'corporate', 'exhibition', 'musical', 'festival'];
  clients TEXT[] := ARRAY['Samsung', 'Hyundai', 'LG', 'SK', 'APEC', 'G20', 'BTS', 'BLACKPINK'];
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
      'Project ' || i,
      'Description for project ' || i,
      categories[1 + (i % 6)],
      clients[1 + (i % 8)],
      CURRENT_DATE - (i || ' days')::INTERVAL,
      'Seoul, Korea',
      'https://images.unsplash.com/photo-' || (1540575467063 + i) || '?w=800',
      ARRAY['LED', 'Event', 'Production'],
      (i % 10 = 0) -- 10개당 1개만 featured
    );
  END LOOP;
END $$;
```

---

## 🎯 API 엔드포인트 설계

### GET /api/portfolios
- 쿼리: `?category=concert&page=1&limit=12&search=samsung`
- 응답: `{ data: [...], total: 200, page: 1, hasMore: true }`

### GET /api/portfolios/[id]
- 응답: 단일 포트폴리오 상세 + 이미지 배열

### POST /api/portfolios (관리자 전용)
- 바디: `{ title, description, category, ... }`

### PUT /api/portfolios/[id] (관리자 전용)
- 바디: 업데이트할 필드

### DELETE /api/portfolios/[id] (관리자 전용)

---

## 📱 프론트엔드 기능

### 갤러리 UI
- ✅ 카테고리 필터 (탭)
- ✅ 검색 (제목, 클라이언트, 태그)
- ✅ 정렬 (최신순, 조회수순)
- ✅ 무한 스크롤 (Intersection Observer)
- ✅ 상세 모달 (이미지 슬라이더)

### 관리자 페이지 (`/admin`)
- ✅ 로그인 (Supabase Auth)
- ✅ 포트폴리오 CRUD
- ✅ 이미지 업로드 (Supabase Storage)
- ✅ 드래그 앤 드롭 정렬

---

## 🚀 다음 단계

1. ✅ Supabase 프로젝트 생성
2. ✅ 테이블 생성 (위 SQL 실행)
3. ✅ 샘플 데이터 200개 삽입
4. ⏳ Next.js API Routes 구현
5. ⏳ 갤러리 UI 구현
6. ⏳ 관리자 페이지 구현

---

© 2026 VIEW-MEDIA
