import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const StockManagement = ({ products, Input,}) => {
  const [show, setShow] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [newStock, setNewStock] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedProductIndex(null);
    setNewStock('');
  };

  const handleShow = (index) => {
    setShow(true);
    setSelectedProductIndex(index);
    setNewStock(products[index].stock);
  };

  const handleStockChange = (e) => {
    setNewStock(e.target.value);
  };

  const handleSaveChanges  = () => {
    if (selectedProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex].stock = newStock;
      handleClose();
    }
  };

  return (
    <>
      <div class = "container">
        <table class = " table table-striped" style={{ textAlign: 'center'}}>
          <thead style={{ border: "1px solid", }}>
            <tr>
              <th style={{backgroundColor: '#0077b6', color: 'white'  }}>Product ID</th>
              <th style={{backgroundColor: '#0077b6', color: 'white' }}>Name</th>
              <th style={{backgroundColor: '#0077b6', color: 'white' }}>Stock</th>
              <th style={{backgroundColor: '#0077b6', color: 'white' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} style={{ border: "1px solid" }}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(index)}>
                    Update Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Stock:</label>
              <input
                type="number"
                style={Input}
                value={newStock}
                onChange={handleStockChange}
              />
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockManagement;
