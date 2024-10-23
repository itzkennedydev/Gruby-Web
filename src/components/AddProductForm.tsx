// components/AddProductForm.tsx

import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      // Assuming you have a way to get the current chef's ID
      chefId: 'current-chef-id',
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      // Reset form or provide feedback
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      alert('Product added successfully!');
    } else {
      // Handle error
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Product</h2>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
