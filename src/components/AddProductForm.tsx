// components/AddProductForm.tsx

import React, { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface ProductData {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  chefId: string;
}

const initialFormState: Omit<ProductData, 'chefId'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
};

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<ProductData, 'chefId'>>(
    initialFormState
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === 'price' ? parseFloat(value) || 0 : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      // Assuming we have a function to get the current chef's ID from context or state
      const getCurrentChefId = () => {
        // This should be replaced with actual logic to retrieve the chef's ID
        // For example, it could come from a React context or a state management solution
        return "actual-chef-id";
      };

      const productData: ProductData = {
        ...formData,
        chefId: getCurrentChefId(),
      };

      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const errorData = (await response.json()) as { message?: string };
          throw new Error(errorData.message ?? 'Failed to add product.');
        }

        setFormData(initialFormState);
        setSuccessMessage('Product added successfully!');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-medium mb-2"
        >
          Product Name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Enter product description"
          rows={4}
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-gray-700 font-medium mb-2"
        >
          Price:
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price === 0 ? '' : formData.price}
          step="0.01"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Enter price"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="imageUrl"
          className="block text-gray-700 font-medium mb-2"
        >
          Image URL:
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Enter image URL"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm;
