import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      const { data } = await axios.get(API_URL, { params: { author: id } });
      setAuthor(data);
      setFollowers(data.followers);
      setFollowing(false);
      setLoading(false);
    }
    fetchAuthor();
  }, [id]);

  function toggleFollow() {
    setFollowers((f) => (following ? f - 1 : f + 1));
    setFollowing((prev) => !prev);
  }

  function copyAddress() {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={author.authorImage} alt={author.authorName} />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="120px" height="24px" />
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={copyAddress}
                              >
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <button className="btn-main" onClick={toggleFollow}>
                            {following ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    loading={loading}
                    nftCollection={author?.nftCollection}
                    authorImage={author?.authorImage}
                    authorId={author?.authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
