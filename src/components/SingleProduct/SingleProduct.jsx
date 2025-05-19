import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { Context } from "../../utils/context";
import MoonLoader from "react-spinners/MoonLoader";

const fallbackProduct = {
  id: 999,
  attributes: {
    title: "Sample Product",
    price: 99,
    desc: "This is a fallback product.",
    quantity: 1,
    img: {
      data: [
        {
          attributes: {
            url: "https://via.placeholder.com/300",
          },
        },
      ],
    },
    categories: {
      data: [
        {
          id: 1,
          attributes: { title: "Sample Category" },
        },
      ],
    },
  },
};

const SingleProduct = () => {
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  console.log("single product data", data);

  const { handleAddToCart } = useContext(Context);

  const incCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decCounter = () => {
    setCounter((prev) => {
      if (prev === 1) return 1;
      else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  // Use API product if available, otherwise fallback
  const product = data?.data?.[0] || fallbackProduct;

  const isOutOfStock = !product?.attributes?.quantity || product?.attributes?.quantity < 1;

  return (
    <div className="single__product__container">
      <div className="layout">
        <div className="single__product__page">
          <div className="left">
            {loading ? (
              <div className="loading">
                <MoonLoader
                  color="#9401ca"
                  cssOverride={{}}
                  loading
                  margin={5}
                  size={64}
                  speedMultiplier={1}
                />
                <h3 style={{ color: "#9401ca" }}>Loading</h3>
              </div>
            ) : (
              <img
                src={product?.attributes?.img?.data?.[0]?.attributes?.url}
                alt=""
              />
            )}
          </div>
          <div className="right">
            <h2>{product?.attributes?.title}</h2>
            <span className="price">
              &#8377; {product?.attributes?.price}
            </span>
            <p>{product?.attributes?.desc}</p>
            <div className="cart__div">
              <div className="quantity__buttons">
                <span onClick={() => decCounter()}>-</span>
                <span>{counter}</span>
                <span onClick={() => incCounter()}>+</span>
              </div>
              <div className="cart">
                <FaCartPlus />
                <h3
                  className="add__to__cart"
                  onClick={() => {
                    if (isOutOfStock) return;
                    handleAddToCart(product, counter);
                    setCounter(1);
                  }}
                  style={{
                    pointerEvents: isOutOfStock ? "none" : "auto",
                    opacity: isOutOfStock ? 0.5 : 1,
                  }}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </h3>
              </div>
            </div>
            <hr />
            <div className="sp__category">
              <div className="sp__title">Category :</div>
              <p className="sp__prod">
                {product?.attributes?.categories?.data?.[0]?.attributes?.title}
              </p>
            </div>
            <div className="sp__socials">
              <div className="sp__title">Share : </div>
              <div className="sp__social">
                <FaLinkedin />
                <FaPinterest />
                <FaGithub />
                <FaInstagram />
                <FaTwitter />
                <FaFacebook />
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts
          productId={id}
          categoryId={product?.attributes?.categories?.data?.[0]?.id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
