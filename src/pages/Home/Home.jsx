import React from "react";
import Hero from "./components/Hero";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import ChatBotBox from "./components/ChatBotBox";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <ChatBotBox />
      <Footer />
    </div>
  );
}
