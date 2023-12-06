import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


function TransactionReport({ transactionData }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleSortButtonClick = () => {
    toggleSortOrder();
  };

  const sortedTransactionData = transactionData.slice().sort((a, b) => {
    const quantityA = a.quantity || 0;
    const quantityB = b.quantity || 0;

    if (sortOrder === "asc") {
      return quantityA - quantityB;
    } else {
      return quantityB - quantityA;
    }
  });

  return (
    <div className="container mt-4">
      <h2>Transaction Report</h2>
      <button
        className="btn btn-primary mt-3"
        onClick={handleSortButtonClick}
      >
        Sort by Transaction Count ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {sortedTransactionData.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.productName}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.category}</td>
              <td>{transaction.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

    </div>
  );
}

export default TransactionReport;