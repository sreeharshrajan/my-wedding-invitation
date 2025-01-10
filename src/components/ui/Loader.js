
export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center gap-4">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/loader.webm"
          className=" border-rose-200 border-t-rose-500"
        />
      </div>
    </div>
  );
}
