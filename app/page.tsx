import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import PortfolioGallery from '@/components/PortfolioGallery';
import SocialFeed from '@/components/SocialFeed';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <PortfolioGallery />
      <SocialFeed />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
