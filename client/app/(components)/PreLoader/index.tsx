import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = 1 + Math.floor((100 - prev) / 10);
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 bg-zinc-900 flex flex-col items-center justify-center z-50">
      <div className="text-4xl md:text-6xl font-bold text-white mb-8">
        Loading <span>...</span>
      </div>
      <div className="w-64 h-0 5 bg-white/20 relative rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3bce24] absolute left-0 top-0 transition-all duration-300 ease-out-expo"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 text-white/70 text-sm">{progress}%</div>
    </div>
  );
};

export default Preloader;
