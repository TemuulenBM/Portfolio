import ContactSection from "../portfolio/ContactSection";
import { Toaster } from "@/components/ui/toaster";

export default function ContactSectionExample() {
  return (
    <div className="relative w-full bg-[#0a0a0a] overflow-hidden rounded-md">
      <ContactSection />
      <Toaster />
    </div>
  );
}
