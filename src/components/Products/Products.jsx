import "./Products.scss";
import Product from "./Product/Product";
import BeatLoader from "react-spinners/BeatLoader";
const randomProducts = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Anime T-Shirt",
        price: 19.99,
        image: "https://via.placeholder.com/150",
        description: "Cool anime-themed t-shirt.",
      },
    },
    {
      id: 2,
      attributes: {
        name: "Manga Mug",
        price: 12.99,
        image: "https://via.placeholder.com/150",
        description: "Mug with manga art.",
      },
    },
    {
      id: 3,
      attributes: {
        name: "Chibi Keychain",
        price: 5.99,
        image: "https://via.placeholder.com/150",
        description: "Cute chibi character keychain.",
      },
    },
  ],
};
const Products = ({
  innerProp,
  text,
  products,
  loading,
  setRelatedProd,
  relatedProd,
}) => {
  const displayProducts =
    products && products.data && Array.isArray(products.data) && products.data.length > 0
      ? products
      : randomProducts;
  return (
    <div className="products__container">
      {!innerProp && <div className="section__heading">{text}</div>}
      {loading ? (
        <span>
          <h3>Loading Products... </h3>
          <BeatLoader
            color="#9401ca"
            cssOverride={{}}
            loading
            margin={5}
            size={18}
            speedMultiplier={1}
          />
        </span>
      ) : (
        <div className="products">
          {(displayProducts?.data ?? []).map(
            (prod) =>
              prod?.attributes && (
                <Product key={prod.id} id={prod.id} data={prod.attributes} />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
