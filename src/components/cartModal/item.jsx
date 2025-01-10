import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

// Local imports
import { deleteItemFromCart, updateItemQuantity } from "../../functions/cart.js";
import Price from "./price.jsx";
import { showCartModal } from "../../store/slices/cartModalSlice.js";
import ConfirmPopup from "../common/confirmPopup.jsx";

// Styles
import style from "./cartModal.module.css";

function Item({ item, cartId }) {
  const [showBtnSpinner, setBtnSpinner] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the displayed image
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the stock of the selected color
  const stock = item?.color
    ? item.product_id.colors.find((color) => color.color === item.color)?.stock
    : 0;

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };

  const handleDelete = () => {
    setBtnSpinner(true);
    deleteItemFromCart(cartId, item?.product_id?._id, item.color).then(() => {
      setBtnSpinner(false);
      setShowWarning(false);
    }).catch(() => {
      setBtnSpinner(false);
      setShowWarning(false);
    });
  };

  // Function to handle image changes
  const handleImageChange = (index) => {
    if (index >= 0 && index < item.product_id.images.length) {
      setCurrentImageIndex(index);
    }
  };

  return (
    <div className="py-2">
      <div className="row">
        <div className="col-3 pt-2">
          {/* Display the selected image */}
          <img
            src={item?.product_id?.images?.[currentImageIndex]?.src || "/path/to/default-image.png"}
            alt={item?.product_id?.name || "Product"}
            className="w-100 h-70"
          />
          {/* Image navigation buttons */}
          <div className="d-flex justify-content-between pt-2">
            <button
              className="btn btn-sm btn-light"
              onClick={() => handleImageChange(currentImageIndex - 1)}
              disabled={currentImageIndex === 0}
            >
              Prev
            </button>
            <button
              className="btn btn-sm btn-light"
              onClick={() => handleImageChange(currentImageIndex + 1)}
              disabled={currentImageIndex === item.product_id.images.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-9">
          <Link
            to={`/product-details/${item?.product_id._id}`}
            className="text-decoration-none text-dark"
            onClick={handleCloseCart}
          >
            <strong className="d-block text-truncate hover-color-yellow">
              {item?.product_id?.name}
            </strong>
          </Link>

          <div className="row">
            <div className="col-6">
              {item?.color && (
                <div className="d-flex fw-semibold">
                  Color:
                  <div
                    style={{ backgroundColor: `${item.color}` }}
                    className={`rounded-circle ms-2 mt-1 border-1 ${style.spanColor}`}
                  ></div>
                </div>
              )}

              <Price
                price={item.product_id.price}
                discount={item?.product_id.discount}
              />
              <div className="d-flex pt-2">
                {showBtnSpinner ? (
                  <div
                    className="spinner-border spinner-border-sm text-dark me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => setShowWarning(true)}
                    type="button"
                    size="sm"
                  />
                )}
              </div>
            </div>

            <div className="col-6">
              <div className={`${style["counter"]} input-group justify-content-center`}>
                <button
                  className="btn rounded-0 border-0"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity - 1,
                      item.color
                    )
                  }
                  disabled={item.quantity === 1 || stock === 0}
                >
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    size="lg"
                    className="hover-color-yellow"
                  />
                </button>
                <p className={`m-0 py-2 px-1 text-center ${style["counter-modal"]}`}>
                  {item.quantity}
                </p>
                <button
                  className="btn rounded-0 border-0"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity + 1,
                      item.color
                    )
                  }
                  disabled={item.quantity >= stock || stock === 0}
                >
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    size="lg"
                    className="hover-color-yellow"
                  />
                </button>
              </div>
              <div className={`${style.stock} ps-3`}>
                <span className="fw-semibold">Stock: </span>
                <span
                  className={`${
                    item.quantity > stock || stock === 0 ? "text-danger" : ""
                  }`}
                >
                  {stock > 0 ? stock : "Out Of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWarning && (
        <ConfirmPopup
          msg={`Are you sure you want to delete ${item.product_id.name} from the cart?`}
          onConfirm={handleDelete}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </div>
  );
}

export default Item;
