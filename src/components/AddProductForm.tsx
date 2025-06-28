// components/AddProductForm.tsx

import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@clerk/nextjs';
import { X, Plus } from 'lucide-react';

interface AddProductFormProps {
  onProductAdded?: () => void;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  homeCookId: string;
}

const initialFormState = {
  name: '',
  description: '',
  price: 0,
  images: [] as string[],
};

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState(initialFormState);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [homeCookId, setHomeCookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeCookId = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/home-cooks');
        const homeCooks = await response.json();
        const currentHomeCook = homeCooks.find((cook: any) => cook.userId === user.id);
        if (currentHomeCook) {
          setHomeCookId(currentHomeCook.id);
        }
      } catch (err) {
        console.error('Error fetching home cook ID:', err);
      }
    };

    fetchHomeCookId();
  }, [user]);

  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages: string[] = [];
    const newPreviews: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        newImages.push(base64);
        newPreviews.push(base64);
        
        // Update state when all files are processed
        if (newImages.length === files.length) {
          setFormData(prev => ({ 
            ...prev, 
            images: [...prev.images, ...newImages] 
          }));
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!homeCookId) {
        setError('Home cook profile not found. Please complete your onboarding first.');
        return;
      }

      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const productData: ProductData = {
        ...formData,
        homeCookId,
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
          const errorData = (await response.json()) as { message?: string; subscriptionRequired?: boolean };
          
          if (errorData.subscriptionRequired) {
            setError('Active subscription required to list products. Please subscribe to continue.');
          } else {
            throw new Error(errorData.message ?? 'Failed to add product.');
          }
        } else {
          setFormData(initialFormState);
          setImagePreviews([]);
          setSuccessMessage('Product added successfully!');
          
          // Call the callback to refresh the products list
          if (onProductAdded) {
            onProductAdded();
          }
        }
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
    [formData, homeCookId, onProductAdded]
  );

  if (!homeCookId) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-6">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-xl font-medium text-gray-900 mb-2">Complete Your Profile First</p>
          <p className="text-gray-600">You need to complete your home cook onboarding before adding products.</p>
        </div>
        <a 
          href="/home-cook-onboarding" 
          className="inline-flex items-center px-6 py-3 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors font-medium"
        >
          Complete Onboarding
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Product</h2>
          <p className="text-gray-600">Create a new product listing for your customers</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
            {error.includes('subscription required') && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <a 
                  href="/home-cook-onboarding" 
                  className="inline-flex items-center px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors text-sm font-medium"
                >
                  Subscribe Now
                </a>
              </div>
            )}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-2 border-green-200 text-green-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
              Product Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base transition-colors"
              placeholder="e.g., Homemade Lasagna, Fresh Sourdough Bread"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-3">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base transition-colors resize-none"
              placeholder="Describe your product, ingredients, cooking method, serving size..."
              rows={4}
            />
          </div>

          {/* Price and Image Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-3">
                Price ($) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price === 0 ? '' : formData.price}
                  step="0.01"
                  min="0"
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Product Images
              </label>
              <div className="space-y-4">
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#FF4D00] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    multiple
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Plus className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">Upload images or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 bg-[#FF4D00] text-white rounded-xl hover:bg-[#E64500] focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-offset-2 transition-colors font-semibold text-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
