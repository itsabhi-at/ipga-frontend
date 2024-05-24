"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomCarousel = ({
  rows,
  cols,
  gapX,
  gapY,
  handleCardOnClick,
  completeSliders,
  numberOfCardsShownInSingleSlide,
}) => {
  const sliderStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridGap: `${gapY}px ${gapX}px`,
    zIndex: 11,
    position: "relative",
  };

  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };

    // Event listener to detect window resize
    window.addEventListener("resize", handleResize);

    // Initial check for device width on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const numberOfSlides = Math.ceil(
    completeSliders?.length / numberOfCardsShownInSingleSlide
  );

  return (
    <Carousel
      className=""
      showArrows={false} // Disable arrow buttons
      showThumbs={false} // Show navigation dots at the bottom
      showStatus={false}
    >
      {Array.from({ length: numberOfSlides }, (_, slideIndex) => (
        <div
          key={slideIndex}
          style={sliderStyle}
          className={isSmallDevice ? "" : ""}
        >
          {completeSliders
            .slice(
              slideIndex * numberOfCardsShownInSingleSlide,
              (slideIndex + 1) * numberOfCardsShownInSingleSlide
            )
            .map((card, cardIndex) => (
              <div
                className="cursor-pointer"
                onClick={
                  handleCardOnClick ? () => handleCardOnClick(card) : () => {}
                }
                key={cardIndex}
              >
                {card}
              </div>
            ))}
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
