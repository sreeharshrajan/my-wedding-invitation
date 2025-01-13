
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-8 rounded-lg  flex flex-col items-center gap-4">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/loader.webm"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
