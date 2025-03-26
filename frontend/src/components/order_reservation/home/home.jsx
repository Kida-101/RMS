import React from "react";

const Home = () => {
  return (
    <div className="relative flex justify-center items-center h-screen text-center overflow-hidden">
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] opacity-80">
        <img
          src="../../../src/assets/food-bg/3.png"
          alt="banner-background"
          className="max-w-[80vw] h-auto drop-shadow-[0px_4px_10px_rgba(0,0,0,0.8)]"
        />
      </div>
      <div>
        <h1 className="flex text-center text-[70px] italic text-orange-500 font-extrabold mt-[180px] relative z-[1] mb-[5px]  font-[Rock_Salt,Caveat_Brush,Dancing_Script,cursive]">
          Delicious Meals, Just a Click Away!
        </h1>
      </div>
    </div>
  );
};

export default Home;
