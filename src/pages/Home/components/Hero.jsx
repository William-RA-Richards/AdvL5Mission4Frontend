import React, { useEffect } from "react";
import styles from "./css/Hero.module.css";
import { useState } from "react";
import img1 from "../../../assets/tina_websitetile_thisway_1078x303f.jpg";
import img2 from "../../../assets/tina_websitetile_1078x303f.jpg";
import img3 from "../../../assets/mostawesome_websiteads_1078x303_tinaf.jpg";
import img4 from "../../../assets/contact-us.png";
import img5 from "../../../assets/how-to-pay.png";
import img6 from "../../../assets/finance_websiteads_newtina_update1078x303f.jpg";

export default function Hero() {
  const imageArray = [img1, img2, img3, img4, img5, img6];

  const arrayLength = imageArray.length - 1;

  const [imageIndex, setImageIndex] = useState(0);

  function prevSlide() {
    setImageIndex(imageIndex === 0 ? arrayLength : imageIndex - 1);
  }

  function nextSlide() {
    setImageIndex(imageIndex === arrayLength ? 0 : imageIndex + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(imageIndex === arrayLength ? 0 : imageIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageIndex]);

  return (
    <div className={styles.sliderContainer}>
      {/* Slider & Images */}
      <section>
        {imageArray.map((slide, index) => {
          return (
            <div
              key={index}
              className={
                index === imageIndex
                  ? `${styles.slides} ${styles.active}`
                  : styles.inactive
              }
            >
              <img src={slide} alt="TINA" className={styles.slideImage} />
            </div>
          );
        })}
        ;
      </section>

      {/* Arrows */}
      <div className={styles.arrows}>
        <span className={styles.leftArrow} onClick={prevSlide}>
          &#10094;
        </span>
        <span className={styles.rightArrow} onClick={nextSlide}>
          &#10095;
        </span>
      </div>

      {/* Dots */}
      <div className={styles.allDots}>
        {imageArray.map((slide, index) => {
          return (
            <span
              key={index}
              className={
                imageIndex === index
                  ? `${styles.dot} ${styles.activeDot}`
                  : styles.dot
              }
              onClick={() => setImageIndex(index)}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
