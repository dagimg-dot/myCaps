import React from "react";

function Home({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/src/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
      className="h-screen px-5 lg:px-10 mg:px-5 py-5 flex flex-col"
    >
      {children}
    </div>
  );
}

export default Home;
