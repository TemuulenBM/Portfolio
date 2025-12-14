import AnimatedBackground from "../portfolio/AnimatedBackground";

export default function AnimatedBackgroundExample() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-md">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-gray-400">Animated Background Preview</p>
      </div>
    </div>
  );
}
