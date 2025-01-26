import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// style
import styles from "./../../pages/home/home.module.css";

// images
import ecoFriendly from "./../../assets/brands-categories/eco-friendly.jpg";
import outDoor from "./../../assets/brands-categories/recliner.jpg";
import sofa from "./../../assets/brands-categories/sofa1.jpg";


const BrandCategories = () => {
  return (
    <>
      <div className="container-fluid">
        <div className={`row mx-0 ${styles.brandCategory}`}>
          <div className={`col-10 col-md-4`}>
            <div
              className={`${styles.modifyImage} overflow-hidden position-relative d-flex justify-content-start align-items-center`}
            >
              <img
                src={sofa}
                alt="ecoFriendly"
                className={`position-absolute top-0 start-0 h-100 w-100 ${styles.brandImage}`}
              />

              <div className={styles.content}>
                <h4>mid-season</h4>
                <h3 className="text-white">Sofa</h3>
                <Link
                  to="shop?page=1&brand=all&category=678367335b8ca043ad6a7ace&sort=0&price=0"
                  className="text-decoration-none cursor-pointer"
                >
                  <p className="text-white">
                    Shop now{" "}
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-10 col-md-4`}>
            <div
              className={`${styles.modifyImage} overflow-hidden position-relative d-flex justify-content-start align-items-center`}
            >
              <img
                src={outDoor}
                alt="outDoor"
                className={`position-absolute top-0 start-0 h-100 w-100 ${styles.brandImage}`}
              />

              <div className={styles.content}>
                <h4>Explore Our Products</h4>
                <h3>Recliner Chair</h3>
                <Link
                  to="/shop?page=1&brand=all&category=67960c8154fa93101424fc6b&sort=0&price=0"
                  className="text-decoration-none cursor-pointer"
                >
                  <p>
                    Shop now{" "}
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-10 col-md-4`}>
            <div
              className={`${styles.modifyImage} overflow-hidden position-relative d-flex justify-content-start align-items-center`}
            >
              <img
                src={ecoFriendly}
                alt="outDoor"
                className={`position-absolute top-0 start-0 h-100 w-100 ${styles.brandImage}`}
              />

              <div className={styles.content}>
                <h4>Some of our products</h4>
                <h3>Home Decor</h3>
                <Link
                  to="/shop?page=1&brand=all&category=67964d25306b2aed9b7f479e&sort=0&price=0"
                  className="text-decoration-none cursor-pointer"
                >
                  <p>
                    Shop now{" "}
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCategories;
