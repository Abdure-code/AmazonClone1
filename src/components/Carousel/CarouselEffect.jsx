import React from "react";
import { img } from "./img/data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carousel.module.css"; 

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img?.map((imageItemLink, index) => (
          <img src={imageItemLink} alt="" key={index} />
        ))}
      </Carousel>
      <div className={styles.hero_img} />
    </div>
  );
}

export default CarouselEffect;
