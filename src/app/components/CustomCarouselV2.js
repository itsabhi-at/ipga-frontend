import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
const CustomCarouselV2 = ({
  rows,
  cols,
  gapX,
  gapY,
  handleCardOnClick,
  completeSliders,
  numberOfCardsShownInSingleSlide,
  topPrev,
  topNext,
  freeFlow,
}) => {
  const sliderStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridGap: `${gapY}px ${gapX}px`,
    zIndex: 11,
    position: "relative",
  };
  const sliderStyleV2 = {
    display: "flex",
    gap: `${gapY}px ${gapX}px`,
    zIndex: 11,
    position: "relative",
    marginRight: "32px",
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

  const renderCustomPrevArrow = (onClickHandler, hasPrev, label) => {
    if (!hasPrev) {
      return (
        <button
          className={`carousel-arrow carousel-arrow-prev absolute ${topPrev} -translate-y-1/2 right-0 z-[12] hidden`}
          onClick={onClickHandler}
          disabled={!hasPrev}
          aria-label={label}
        >
          <div className="rounded-full h-fit w-[32px] flex items-center justify-center text-greyish text-xl ">
            <AiOutlineArrowLeft className="" />
          </div>
        </button>
      ); // Return null if there is no previous slide
    }
    return (
      <button
        className={`carousel-arrow carousel-arrow-prev absolute ${topPrev} -translate-y-1/2 right-0 z-[12] hidden`}
        onClick={onClickHandler}
        disabled={!hasPrev}
        aria-label={label}
      >
        <div className="rounded-full h-fit w-[32px] flex items-center justify-center text-yellowish text-xl ">
          <AiOutlineArrowLeft />
        </div>
      </button>
    );
  };

  const renderCustomNextArrow = (onClickHandler, hasNext, label) => {
    if (!hasNext) {
      return (
        <button
          className={`carousel-arrow carousel-arrow-next absolute ${topNext} -translate-y-1/2 right-0 z-[12] hidden`}
          onClick={onClickHandler}
          disabled={!hasNext}
          aria-label={label}
        >
          <div className="rounded-full h-fit w-[32px] flex items-center justify-center text-greyish text-xl ">
            <AiOutlineArrowRight />
          </div>
        </button>
      ); // Return null if there is no next slide
    }

    return (
      <button
        className={`carousel-arrow carousel-arrow-next absolute ${topNext} -translate-y-1/2 right-0 z-[12] hidden`}
        onClick={onClickHandler}
        disabled={!hasNext}
        aria-label={label}
      >
        <div className="rounded-full h-fit w-[32px] flex items-center justify-center text-yellowish text-xl ">
          <AiOutlineArrowRight />
        </div>
      </button>
    );
  };
  const numberOfSlides = Math.ceil(
    completeSliders?.length / numberOfCardsShownInSingleSlide
  );
  return (
    <Carousel
      showArrows={true}
      renderArrowPrev={renderCustomPrevArrow}
      renderArrowNext={renderCustomNextArrow}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      className=""
    >
      {Array.from({ length: numberOfSlides }, (_, slideIndex) => (
        <div
          key={slideIndex}
          style={freeFlow ? sliderStyleV2 : sliderStyle}
          className={isSmallDevice ? "" : ""}
        >
          {completeSliders
            .slice(
              slideIndex * numberOfCardsShownInSingleSlide,
              (slideIndex + 1) * numberOfCardsShownInSingleSlide
            )
            .map((card, cardIndex) => (
              <div
                className="cursor-pointer h-fit w-full"
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

export default CustomCarouselV2;
