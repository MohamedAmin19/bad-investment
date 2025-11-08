import { FullScreenBackground } from "@/components/FullScreenBackground";
import { HeroSection } from "@/components/HeroSection";
import { HomeFooter } from "@/components/HomeFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden text-white">
      <FullScreenBackground
        src="/background-image.png"
        alt="Concert crowd under atmospheric lighting"
      />

      <HeroSection title="BADINVSTMNT" menuItems={mainMenuItems} />

      <HomeFooter socialLinks={socialLinks} />
    </main>
  );
}
