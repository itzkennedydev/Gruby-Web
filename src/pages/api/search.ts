import { NextApiRequest, NextApiResponse } from 'next';
import { mockChefs, MealItem } from '~/data/mockChefs';
import { mockProducts, Product } from '~/data/mockProducts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q !== 'string') {
    return res.status(400).json({ error: 'Invalid search query' });
  }

  const searchTerm = q.toLowerCase();

  const chefResults = mockChefs.filter(chef => 
    chef.name.toLowerCase().includes(searchTerm) || 
    chef.category.toLowerCase().includes(searchTerm)
  );

  const dishResults = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );

  const results = {
    chefs: chefResults,
    dishes: dishResults,
  };

  res.status(200).json(results);
}
