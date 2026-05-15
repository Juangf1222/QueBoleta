import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturedEvents } from './FeaturedEvents';
import { Categories } from './Categories';
import { ComingSoon } from './ComingSoon';
import { TrustSection } from './TrustSection';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedEvents />
        <Categories />
        <ComingSoon />
        <TrustSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
