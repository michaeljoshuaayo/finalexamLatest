// TransactionManagement.js
import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Addcart from '../Pages/Addcart';
import Cart from '../Pages/Cart';
import TransactionReport from './TransactionReport';

function TransactionManagement({ products, setProducts }) {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const handleSuccessfulPurchase = (transactionData) => {
    // Handle the successful purchase data here
    console.log("Transaction data:", transactionData);

    // Accumulate transaction data
    setTransactions((prevTransactions) => [...prevTransactions, ...transactionData]);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const handleTransaction = (transactionData) => {
    setTransactions((prevTransactions) => [...prevTransactions, transactionData]);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="addcart"
        id="fill-tab-example"
        className="mb-3 p-3 custom-tabs"
        fill
        variant='underline'
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        <Tab eventKey="addcart" title="Add to Cart">
          <Addcart
            setProducts={setProducts}
            products={products}
            cart={cart}
            setCart={setCart}
            quantities={quantities}
            setQuantities={setQuantities}
            handleTransaction={handleTransaction}
          />
        </Tab>
        <Tab eventKey="cart" title="Cart">
        <Cart
          products={products}
          setProducts={setProducts}
          cart={cart}
          setCart={setCart}
          quantities={quantities}
          setQuantities={setQuantities}
          handleRemoveItem={handleRemoveItem}
          handleSuccessfulPurchase={handleTransaction}
        />
        </Tab>
      </Tabs>
      <TransactionReport transactionData={transactions} />
    </div>
  );
}

export default TransactionManagement;
