import React from "react";
import styles from "./css/Header.module.css";
import Logo from "../assets/turnerscars_logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src={Logo} alt="Turners" />
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li className={styles.navItem}>
          <Link to="/">Car Evaluation</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/claim-history">Claim History</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/premium-calculator">Premium Calculator</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/discount-rate">Discount Rate</Link>
        </li>
        <li className={styles.navItem}>
          <button className={styles.loginButton}>Login</button>
        </li>
      </ul>
    </nav>
  );
}
