import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">

      <div className="hero min-h-screen"
        style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)' }}>
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content flex-col lg:flex-row-reverse rounded-lg w-full max-w-[900px] h-auto lg:h-[500px]">
        <div className="max-w-md max-h-full">
              <div className="flex flex-col items-center w-full max-w-md mx-auto">
                <Image
                  src="/logoWPITCOM.png"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </div>
            <h1 className="mb-5 text-5xl font-bold text-white text-center">WPitcom News</h1>
            <p className="mb-5 font-mono text-white text-center">
              Welcome to WPitcom News, the best source of news on the web. Here you can find the latest news on technology, business, science, and more.
              Please Login now
            </p>
            <a href="/Login" className="btn btn-neutral w-full">Start</a>
          </div>
        </div>
      </div>
    </div>
  );
}
