import React from "react";
import Logo from "../assets/turnerscars_logo.png";
import styles from "./css/Footer.module.css";

export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <img className={styles.logo} src={Logo} alt="Turners" />
        <p>
          © 2025 Turner's Car Insurance. All rights reserved. T.I.N.A® is a
          registered trademark of Turner's Car Insurance.
        </p>
      </footer>
    </div>
  );
}
