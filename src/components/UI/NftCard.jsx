import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

// Reusable NFT item card used by New Items and Explore. Callers provide the
// surrounding grid/slide wrapper; this renders the inner .nft__item block.
const NftCard = ({ item, index = 0 }) => {
  const shareUrl = encodeURIComponent(
    `${window.location.origin}/item-details/${item.nftId}`
  );

  return (
    <div
      className="nft__item"
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 100}
    >
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`} title="Creator">
          <img className="lazy" src={item.authorImage} alt={item.title} />
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
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href={`mailto:?body=${shareUrl}`}>
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
