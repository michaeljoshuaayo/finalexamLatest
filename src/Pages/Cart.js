import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { MDBIcon } from 'mdb-react-ui-kit';
import { Button, Alert, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import TransactionReport from "../components/TransactionReport";

export default function Cart({
  products,
  setProducts,
  cart,
  quantities,
  setQuantities,
  handleRemoveItem,
  handleSuccessfulPurchase,
}) {
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [transactionData, setTransactionData] = useState([]);


  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setShowAlert(true);
      });
    }
  }, [isLoading]);

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

  const handleCloseAlert = () => setShowAlert(false);

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
  };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: Math.max((prevQuantities[index] || 0) - 1, 0),
    }));
  };

  const handleToggleProduct = (index) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const totalQuantity = selectedProducts.reduce(
    (total, selectedIndex) =>
      total + (quantities[selectedIndex] || 0),
    0
  );

  const totalAmount = selectedProducts.reduce(
    (total, selectedIndex) =>
      total + products[selectedIndex].price * (quantities[selectedIndex] || 0),
    0
  );

  const handleBuyNow = () => {
    setLoading(true);
  
    let alertMessage = null;
    let updatedProducts = [...products];
    let newTransactionData = [];
  
    selectedProducts.forEach((index) => {
      if (quantities[index] === 0) {
        alertMessage = "Please select a quantity greater than 0 for the product.";
      } else if (quantities[index] > products[index].stock) {
        alertMessage = "Ordered quantity not available!";
      } else {
        const updatedStock = Math.max(
          products[index].stock - (quantities[index] || 0),
          0
        );
  
        // Update the product's stock directly in the cloned array
        updatedProducts[index] = {
          ...updatedProducts[index],
          stock: updatedStock,
        };
  
        // Collect transaction data
        newTransactionData.push({
          productName: products[index].name,
          quantity: quantities[index],
          category: products[index].category,
        });
      }
    });
  
    if (alertMessage) {
      setAlertMessage(alertMessage);
      setShowAlert(true);
    } else {
      const currentDate = new Date(); // Get the current date
      const formattedDate = currentDate.toLocaleDateString();
  
      const newTransactionData = selectedProducts.map((index) => ({
        productName: products[index].name,
        quantity: quantities[index],
        category: products[index].category,
      }));
  
      // Add date and total amount to each transaction
      newTransactionData.forEach((transaction) => {
        transaction.date = formattedDate;
        transaction.totalAmount = products.find(
          (product, index) => index === selectedProducts.find((selectedIndex) => selectedIndex === index)
        ).price * transaction.quantity;
      });
  
      // Call the passed handleSuccessfulPurchase function
      handleSuccessfulPurchase(newTransactionData[0]); // Pass a single transaction object
  
      Swal.fire({
        icon: "success",
        title: "Purchase Successful!",
        text: "Thank you for your purchase. 🌟",
        timer: 2000,
        showConfirmButton: false,
      });
  
      // Update the state with the transaction data
      setTransactionData(newTransactionData);
  
      // Update the products array
      setProducts(updatedProducts);
    }
  
    // Clear selected products
    setSelectedProducts([]);
  };
  

  const handleCheckboxChange = (index) => {
    // Toggle the selection
    const updatedSelectedProducts = selectedProducts.includes(index)
      ? selectedProducts.filter((selectedIndex) => selectedIndex !== index)
      : [...selectedProducts, index];

    // If a product is selected, decrement its quantity
    if (!selectedProducts.includes(index)) {
      handleDecrement(index);
    }

    setSelectedProducts(updatedSelectedProducts);
  };
  
  

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                {showAlert && (
                  <Alert variant="danger" onClose={handleCloseAlert} dismissible>
                    {alertMessage}
                  </Alert>
                )}
                <MDBTypography tag="h5" className="mb-0">
                  Cart
                </MDBTypography>
              </MDBCardHeader>
              {cart.map((product, index) => (
                <MDBCardBody key={index}>
                  <MDBRow >
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple rippleTag="div" rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay">
                        {product.image && (
                          <img
                            src={URL.createObjectURL(product.image)}
                            alt={`Product ${product.name}`}
                            className="w-100"
                          />
                        )}

                        <a href="#!">
                          <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                          </div>
                        </a>
                      </MDBRipple>
                      <div className="form-check" style={{ fontSize: '20px' }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`productCheckbox${index}`}
                          checked={selectedProducts.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          style={{ border: '2px solid black' }}
                        />
                        <label className="form-check-label" htmlFor={`productCheckbox${index}`}>
                          Select
                        </label>
                      </div>
                    </MDBCol>
                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong style={{ fontSize: "24px" }}>{product.name}</strong>
                      </p>
                      <p>Category: {product.category}</p>
                      <p>Stock: {product.stock}</p>
                      <p>Price: {product.price}</p>
                      <Button wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2" variant="danger"
                        title="Remove item" onClick={() => handleRemoveItem(index)}>
                        <MDBIcon fas icon="trash" />
                      </Button>
                    </MDBCol>
                    <MDBCol lg="4" md="2" className="mb-3">
                      <div className="d-flex mb-4">
                        <Button className="h-4 me-2" onClick={() => handleDecrement(index)}>
                          <MDBIcon fas icon="minus" />
                        </Button>
                        <MDBInput
                          type="number"
                          label="Quantity"
                          value={quantities[index] || 0} />
                        <Button className="px-3 ms-2" onClick={() => handleIncrement(index)}>
                          <MDBIcon fas icon="plus" />
                        </Button>
                      </div>
                      <p className="text-start text-md-center">
                        <strong>₱{product.price * (quantities[index] || 0)}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <hr className="my-4" />
                </MDBCardBody>
              ))}
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>₱{totalAmount.toFixed(2)}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <div className="d-grid gap-2">
                  <Button
                    block
                    size="lg"
                    disabled={isLoading || selectedProducts.length === 0 || selectedProducts.some((index) => quantities[index] === 0)}
                    onClick={handleBuyNow}
                  >
                    {isLoading ? 'Loading…' : 'Buy Now'}
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </section>
  );
}
