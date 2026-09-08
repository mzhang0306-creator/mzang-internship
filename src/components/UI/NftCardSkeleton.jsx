import React from "react";
import Skeleton from "./Skeleton";

// Loading placeholder matching the NftCard layout (avatar + image + info).
const NftCardSkeleton = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
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
);

export default NftCardSkeleton;
