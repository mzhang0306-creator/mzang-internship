import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Shared carousel arrows + settings used by Hot Collections and New Items.

export function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hot-coll-nav hot-coll-nav--prev"
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft />
    </button>
  );
}

export function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hot-coll-nav hot-coll-nav--next"
      onClick={onClick}
      aria-label="Next"
    >
      <FaChevronRight />
    </button>
  );
}

export const carouselSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 992, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};
