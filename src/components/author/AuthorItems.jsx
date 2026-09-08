import React from "react";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const AuthorItems = ({ loading, nftCollection = [], authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NftCardSkeleton />
                </div>
              ))
            : nftCollection.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nft.id}
                >
                  <NftCard
                    item={{ ...nft, authorImage, authorId }}
                    index={index}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
