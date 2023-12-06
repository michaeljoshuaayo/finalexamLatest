import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Home from './Home';
import TransactionManagement from './components/TransactionManagement';
import StockManagement from "./components/StockManagement";
import TransactionReport from "./components/TransactionReport";
import Cart from "./Pages/Cart";



function App() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleSuccessfulPurchase = (transactionData) => {
    // Log the transactions state before updating
    console.log("Transactions before:", transactions);
  
    // Accumulate transaction data and log after the state is updated
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
    <Tabs
      defaultActiveKey="products"
      id="justify-tab-example"
      className="p-3 mb-2 bg-light text-dark fs-5"
      justify
      variant='pills'
    >
      <Tab eventKey="products" title="Product Management">
        <Home
          products={products}
          setProducts={setProducts}
        />
      </Tab>
      <Tab eventKey="transaction" title="Transaction Management">
        <TransactionManagement
          products={products}
          setProducts={setProducts}
        />
      </Tab>
      <Tab eventKey="Stock" title="Stock Management">
        <StockManagement
          products={products}
          Input={Input}
        />
      </Tab>
      <Tab eventKey="report" title="Report">
        <TransactionReport 
          
          transactionData={transactions}
        />
      </Tab>
    </Tabs>
  );
}

const Input = {
  width: "100%",
  padding: "10px",
  margin: "5px 0 22px 0",
  display: "inlineBlock",
  border: "none",
  background: "#f7f7f7",
  fontFamily: "Montserrat,Arial, Helvetica, sans-serif"
};

export default App;
