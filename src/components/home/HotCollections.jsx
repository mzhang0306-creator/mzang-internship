import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

function PrevArrow({ onClick }) {
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

function NextArrow({ onClick }) {
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

const sliderSettings = {
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

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setCollections(data);
      setLoading(false);
    }
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...sliderSettings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="hot-coll-slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="100px" height="20px" />
                          <br />
                          <Skeleton width="60px" height="16px" />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection) => (
                    <div className="hot-coll-slide" key={collection.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt={collection.title}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
