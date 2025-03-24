import React from "react";
import "./home.css";
const Home = () => {
  return (
    <div className="background">
      <div className="bg-image">
        <img src="../../src/assets/food-bg/3.png" alt="banner-background" />
      </div>
      <div>
        <h1 className="banner-txt">Delicious Meals, Just a Click Away!</h1>
        {/* <p className="banner-slogan">
          Order your favorite dishes fresh & fast delivered right to your table
          or door!
        </p> */}
      </div>
    </div>
  );
};

export default Home;
