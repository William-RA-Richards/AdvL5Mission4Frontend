import React from "react";
import styles from "./css/Card.module.css";

export default function Card({ img, title, text }) {
  return (
    <div className={styles.box}>
      <img src={img} alt="Image" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
