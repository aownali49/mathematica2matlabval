import React from "react";
import Footer from "./Footer/Footer";
import ValueShorten from "./ValueShorten";
import "./Home.css";


export default function Home() {
  return (
    <div className="home-container">
      <ValueShorten />
      <Footer />
    </div>
  );
}
