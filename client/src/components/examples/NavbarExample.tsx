import Navbar from "../portfolio/Navbar";

export default function NavbarExample() {
  return (
    <div className="relative w-full h-[200px] bg-[#0a0a0a] overflow-hidden rounded-md">
      <Navbar />
      <div className="pt-20 px-6">
        <p className="text-gray-400 text-sm">Scroll down to see navbar effects</p>
      </div>
    </div>
  );
}
