import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import { carouselSettings } from "../UI/CarouselArrows";
import useCountdown from "../../hooks/useCountdown";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

function CountdownTimer({ expiryDate }) {
  const [expired, setExpired] = useState(false);
  const handleComplete = useCallback(() => setExpired(true), []);
  const { timerDays, timerHours, timerMinutes, timerSeconds } = useCountdown(
    expiryDate,
    handleComplete
  );

  if (!expiryDate || expired) return null;

  // Fold any days into the hours so the badge stays in h/m/s form.
  const hours = timerDays * 24 + timerHours;

  return (
    <div className="de_countdown">
      {hours}h {timerMinutes}m {timerSeconds}s
    </div>
  );
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...carouselSettings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="hot-coll-slide" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton width="100%" height="200px" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="100px" height="20px" />
                          <br />
                          <Skeleton width="60px" height="16px" />
                          <br />
                          <Skeleton width="40px" height="16px" />
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div className="hot-coll-slide" key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to="/author" title="Creator">
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <CountdownTimer expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to="/item-details">
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
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

export default NewItems;
