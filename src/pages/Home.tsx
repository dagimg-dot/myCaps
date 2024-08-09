import React from "react";

function Home({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://i.postimg.cc/PNnx2kXJ/bg-1.webp')",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
      className="px-5 flex flex-col relative"
    >
      {children}
    </div>
  );
}

export default Home;
