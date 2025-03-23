import React from "react";
import Logo from "../assets/turnerscars_logo.png";
import styles from "./css/Footer.module.css";

export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <img className={styles.logo} src={Logo} alt="Turners" />
      </footer>
    </div>
  );
}
