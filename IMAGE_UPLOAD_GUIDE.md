# 📸 포트폴리오 이미지 업로드 가이드

VIEW-MEDIA 랜딩페이지에 실제 포트폴리오 이미지를 추가하는 방법입니다.

---

## 🎯 방법 1: 로컬 이미지 업로드 (추천 ⭐)

### 1단계: 이미지 준비

#### 권장 사양
- **사이즈**: 800×600px (가로형) 또는 1200×900px (고해상도)
- **포맷**: JPG (호환성) 또는 WebP (최적화)
- **용량**: 최대 200KB (웹 최적화)
- **화질**: 80-85% (TinyPNG 압축 추천)

#### 필요한 이미지 (6개)
1. `conference.jpg` - 국제 컨퍼런스 (APEC, 포럼 등)
2. `concert.jpg` - K-Pop 콘서트 (무대, LED 월)
3. `corporate.jpg` - 기업 행사 (삼성, 현대 등)
4. `exhibition.jpg` - 전시회 (모터쇼, 부스)
5. `musical.jpg` - 뮤지컬 (미디어 파사드)
6. `festival.jpg` - 페스티벌 (야외 행사)

---

### 2단계: 폴더 구조 생성

프로젝트 루트에서:

```bash
mkdir -p public/images/portfolio
```

또는 수동으로:
```
viewmedia-landing/
  └── public/
      └── images/
          └── portfolio/
              ├── conference.jpg
              ├── concert.jpg
              ├── corporate.jpg
              ├── exhibition.jpg
              ├── musical.jpg
              └── festival.jpg
```

---

### 3단계: 이미지 복사

준비한 이미지 6개를 `public/images/portfolio/` 폴더에 복사

**이름 규칙 준수!**
- ✅ `conference.jpg` (소문자, 확장자 확인)
- ❌ `Conference.JPG` (대소문자 구분)
- ❌ `conference-2025.jpg` (이름 다름)

---

### 4단계: 코드 확인 (이미 수정 완료)

`components/Portfolio.tsx` 파일이 이미 로컬 경로로 수정되어 있습니다:

```typescript
const portfolioItems = [
  {
    key: 'conference',
    image: '/images/portfolio/conference.jpg', // ✅ 로컬 이미지
  },
  // ... 나머지 5개
];
```

---

### 5단계: 확인

```bash
npm run dev
```

브라우저에서 포트폴리오 섹션 확인!

---

## 🌐 방법 2: 외부 URL 사용

이미지가 이미 온라인에 있는 경우:

### 1단계: 이미지 URL 복사
예: `https://your-cdn.com/images/conference.jpg`

### 2단계: `components/Portfolio.tsx` 수정

```typescript
const portfolioItems = [
  {
    key: 'conference',
    image: 'https://your-cdn.com/images/conference.jpg', // 외부 URL
  },
];
```

### 3단계: `next.config.js`에 도메인 추가

```javascript
module.exports = {
  images: {
    domains: ['your-cdn.com'], // 외부 이미지 도메인
  },
}
```

---

## ☁️ 방법 3: Vercel/Cloudinary CDN 사용

프로 레벨 이미지 관리:

### Cloudinary (무료)

1. **[Cloudinary](https://cloudinary.com) 가입**
2. **이미지 업로드** (대시보드)
3. **URL 복사**:
   ```
   https://res.cloudinary.com/your-id/image/upload/v1/conference.jpg
   ```
4. **Portfolio.tsx에 URL 붙여넣기**

**장점:**
- ✅ 자동 최적화 (WebP 변환)
- ✅ 반응형 이미지 (다양한 크기 자동 생성)
- ✅ 빠른 CDN
- ✅ 무료 25GB

---

## 🖼️ 이미지 최적화 팁

### 압축 도구 (무료)
- **[TinyPNG](https://tinypng.com)** - 70% 용량 감소 (추천 ⭐)
- **[Squoosh](https://squoosh.app)** - Google 제공
- **[ImageOptim](https://imageoptim.com)** - Mac 전용

### 사이즈 조절
```bash
# ImageMagick (Mac/Linux)
convert input.jpg -resize 800x600 -quality 85 output.jpg

# Online: https://www.iloveimg.com/resize-image
```

### WebP 변환 (최신 포맷)
```bash
# Mac/Linux
brew install webp
cwebp -q 80 input.jpg -o output.webp
```

---

## 📋 체크리스트

### 이미지 준비
- [ ] 6개 이미지 준비 완료
- [ ] 사이즈 확인 (800×600px 권장)
- [ ] 용량 최적화 (200KB 이하)
- [ ] 파일명 확인 (소문자, 확장자)

### 업로드
- [ ] `public/images/portfolio/` 폴더 생성
- [ ] 이미지 6개 복사
- [ ] 파일명 정확히 일치 확인

### 확인
- [ ] `npm run dev` 실행
- [ ] 포트폴리오 섹션 이미지 표시 확인
- [ ] 호버 효과 작동 확인
- [ ] 모바일 반응형 확인

---

## 🎨 포트폴리오 항목 추가/삭제

### 항목 추가 (7개로 늘리기)

`components/Portfolio.tsx`:

```typescript
const portfolioItems = [
  // 기존 6개...
  {
    key: 'vr',
    image: '/images/portfolio/vr.jpg',
  },
];
```

`locales/translations.ts`에 번역 추가:

```typescript
portfolio: {
  // ...
  vr: {
    title: 'VR Experience',
    desc: 'Interactive VR media production',
  },
}
```

### 항목 삭제

배열에서 해당 객체 제거:

```typescript
const portfolioItems = [
  // festival 제거
  // {
  //   key: 'festival',
  //   image: '/images/portfolio/festival.jpg',
  // },
];
```

---

## 🚨 문제 해결

### 이미지가 안 보여요!

**확인 사항:**
1. 파일 경로가 정확한가?
   ```
   /images/portfolio/conference.jpg (O)
   /public/images/portfolio/conference.jpg (X)
   ```

2. 파일명이 정확한가?
   ```
   conference.jpg (O)
   Conference.JPG (X)
   conference (확장자 없음) (X)
   ```

3. 서버 재시작:
   ```bash
   # Ctrl+C로 종료 후
   npm run dev
   ```

### 이미지가 깨져요!

- 파일 용량 확인 (10MB 이하)
- 파일 포맷 확인 (JPG, PNG, WebP만 가능)
- 브라우저 캐시 삭제 (Ctrl+Shift+R)

### 이미지가 느려요!

- 이미지 압축 (TinyPNG)
- WebP 포맷 사용
- Cloudinary CDN 사용

---

## 📊 권장 이미지 크기

| 디바이스 | 권장 크기 | 용도 |
|----------|----------|------|
| 데스크톱 | 800×600px | 포트폴리오 그리드 |
| 모바일 | 600×450px | 반응형 자동 조절 |
| 고해상도 | 1200×900px | Retina 디스플레이 |
| 썸네일 | 400×300px | 로딩 속도 |

**Next.js Image 컴포넌트**는 자동으로 최적화합니다!

---

## 💡 고급: Next.js Image 컴포넌트 사용

더 나은 성능을 위해:

`components/Portfolio.tsx` 수정:

```typescript
import Image from 'next/image';

// img 태그를 Image 컴포넌트로 변경
<Image
  src={item.image}
  alt={t(`portfolio.${item.key}.title`)}
  width={800}
  height={600}
  quality={85}
  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
/>
```

**장점:**
- 자동 WebP 변환
- 지연 로딩 (Lazy Loading)
- 반응형 이미지
- 최적화된 로딩

---

## 📞 문의

이미지 업로드 관련 문제가 있으면:
- 📧 viewmedia@view-media.kr
- 📞 +82-1644-4262

---

© 2026 VIEW-MEDIA Co., Ltd.
