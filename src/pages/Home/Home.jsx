import React from "react";
import Hero from "./components/Hero";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import ChatBotBox from "./components/ChatBotBox";
import Card from "./components/Card";
import { CardData } from "./components/CardData";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <ChatBotBox />
      <div className={styles.cardGrid}>
        {CardData.map((card) => {
          return (
            <Card
              key={card.id}
              img={card.img}
              title={card.title}
              text={card.text}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
