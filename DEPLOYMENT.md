# VIEW-MEDIA 랜딩페이지 배포 가이드

## 🎯 배포 옵션

### ✅ 옵션 1: Vercel (추천)

**장점:**
- 무료
- 자동 배포
- HTTPS 자동
- 글로벌 CDN
- 무제한 대역폭

**배포 단계:**

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/viewmedia-landing.git
   git push -u origin main
   ```

2. **Vercel 연결**
   - [Vercel](https://vercel.com) 접속
   - "New Project" 클릭
   - GitHub 저장소 연결
   - "Deploy" 클릭

3. **자동 배포 완료!**
   - URL: `https://viewmedia-landing.vercel.app`
   - 커스텀 도메인 연결 가능

---

### ✅ 옵션 2: Netlify

**장점:**
- 무료
- 폼 처리 내장
- HTTPS 자동

**배포 단계:**

1. GitHub 저장소에 푸시
2. [Netlify](https://netlify.com) 연결
3. Build 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

### ✅ 옵션 3: GitHub Pages (정적 사이트만)

**제한사항:** Next.js API Routes 사용 불가

**배포 단계:**

1. `next.config.js` 수정:
   ```javascript
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. 배포:
   ```bash
   npm run build
   npx serve out
   ```

---

## 🔧 환경 변수 설정

### Formspree 폼 연동

1. [Formspree](https://formspree.io) 가입
2. Form 생성
3. Form ID 복사
4. `.env.local` 생성:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=your_form_id
   ```

5. `components/Contact.tsx` 수정:
   ```typescript
   const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   ```

---

## 📊 Google Analytics 설정

### GA4 추가

1. [Google Analytics](https://analytics.google.com) 가입
2. 측정 ID 복사 (예: G-XXXXXXXXXX)
3. `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. `app/layout.tsx`에 추가:
   ```typescript
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

---

## 🔍 SEO 설정

### Google Search Console

1. [Search Console](https://search.google.com/search-console) 접속
2. 도메인 추가
3. Sitemap 제출: `https://yourdomain.com/sitemap.xml`

### 사이트맵 확인

- `/public/sitemap.xml` 파일 확인
- 12개 언어 URL 포함 확인

---

## 🌐 커스텀 도메인 연결

### Vercel 도메인 설정

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 입력 (예: view-media.kr)
3. DNS 레코드 추가:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

### 도메인 구매 추천

- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [가비아](https://www.gabia.com) (한국)

---

## 📧 이메일 알림 설정

### Formspree 알림

1. Formspree 대시보드
2. Notifications → Email
3. 알림 받을 이메일 추가

### EmailJS (대안)

1. [EmailJS](https://www.emailjs.com) 가입
2. Service 생성 (Gmail 연동)
3. Template 생성
4. Public Key 복사

---

## 🚀 성능 최적화

### 이미지 최적화

1. 포트폴리오 이미지 압축:
   - [TinyPNG](https://tinypng.com)
   - 권장 크기: 800×600px, 최대 200KB

2. Next.js Image 컴포넌트 사용:
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/images/portfolio1.jpg"
     alt="Portfolio"
     width={800}
     height={600}
     quality={80}
   />
   ```

---

## 🎯 Google Ads 설정

### 키워드 광고 전략

**영어 키워드:**
- "LED rental Seoul"
- "event production Korea"
- "AV rental Seoul"

**일본어 키워드:**
- "ソウル LED レンタル"
- "韓国 イベント設営"

**중국어 키워드:**
- "首尔LED租赁"
- "韩国活动制作"

### 예산 추천

- 일 예산: ₩30,000
- 타겟 국가: 미국, 일본, 싱가포르, 홍콩

---

## 📋 체크리스트

### 배포 전

- [ ] 모든 이미지 추가 완료
- [ ] Formspree 폼 연동
- [ ] 환경 변수 설정
- [ ] 메타태그 확인
- [ ] 반응형 테스트

### 배포 후

- [ ] Google Analytics 설치
- [ ] Search Console 등록
- [ ] Sitemap 제출
- [ ] 도메인 연결
- [ ] Google Ads 캠페인 시작

---

## 🆘 문제 해결

### 빌드 에러

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌

```bash
# 다른 포트 사용
npm run dev -- -p 3001
```

### 배포 실패

- Vercel 로그 확인
- 환경 변수 확인
- 빌드 명령어 확인

---

## 📞 지원

문제 발생 시:
- 📧 viewmedia@view-media.kr
- 📞 +82-1644-4262

---

© 2026 VIEW-MEDIA Co., Ltd.
