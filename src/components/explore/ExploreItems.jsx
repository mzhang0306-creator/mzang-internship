import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(INITIAL_COUNT);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const { data } = await axios.get(API_URL, {
        params: filter ? { filter } : undefined,
      });
      setItems(data);
      setVisible(INITIAL_COUNT);
      setLoading(false);
    }
    fetchItems();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(INITIAL_COUNT).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCardSkeleton />
            </div>
          ))
        : items.slice(0, visible).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}

      {!loading && visible < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisible((v) => v + LOAD_MORE_STEP)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
