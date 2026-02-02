// Google Ads 전환 추적 함수

// 문의 폼 제출 시 호출
export function trackFormSubmission() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17925811977/form_submit',
      'value': 1.0,
      'currency': 'KRW'
    });
  }
}

// 전화 클릭 시 호출
export function trackPhoneClick() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17925811977/phone_click',
      'value': 1.0,
      'currency': 'KRW'
    });
  }
}

// WhatsApp 클릭 시 호출
export function trackWhatsAppClick() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17925811977/whatsapp_click',
      'value': 1.0,
      'currency': 'KRW'
    });
  }
}

// 페이지뷰 추적
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'AW-17925811977', {
      'page_path': url
    });
  }
}
