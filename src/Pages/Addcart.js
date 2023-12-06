import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import "./index.css"

const Addcart = ({ products, setCart }) => {
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let alertTimeout;

    if (showAlert) {
      alertTimeout = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [showAlert]);

  const addToCart = (product) => {
    setLoadingProduct(product.id);

    // Simulate a network request (replace this with your actual network request)
    setTimeout(() => {
      setCart((prevCart) => [...prevCart, product]);
      setLoadingProduct(null);
      setShowAlert(true);
    }, 2000);
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <>
      <div className="home-container">
        {showAlert && (
          <Alert variant="success" onClose={handleCloseAlert} dismissible>
            Successfully Added!
          </Alert>
        )}
        <h2>Shopping Cart</h2>
        <div className="products">
          {products
            .filter((product) => product.stock >= 1)
            .map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                {product.image && (
                  <img
                    src={URL.createObjectURL(product.image)}
                    alt={`Product ${product.name}`}
                  />
                )}
                <div className="details">
                  <span>Stock: {product.stock}</span>
                  <span className="price">₱{product.price}</span>
                </div>
                <Button
                  disabled={loadingProduct === product.id}
                  onClick={() => addToCart(product)}
                >
                  {loadingProduct === product.id
                    ? 'Loading…'
                    : 'Add to Cart'}
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Addcart;
