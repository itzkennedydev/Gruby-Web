import React, { useMemo } from 'react';

interface Order {
  id: number;
  name: string;
  date: string;
  status: 'Delivered' | 'In Progress' | 'Cancelled';
}

const OrderList: React.FC = () => {
  // Mock data for demonstration purposes
  const orders: Order[] = [
    { id: 1, name: 'Sushi Platter', date: '2023-10-01', status: 'Delivered' },
    { id: 2, name: 'Taco Fiesta', date: '2023-09-28', status: 'In Progress' },
    // Add more orders as needed
  ];

  const getStatusColor = useMemo(() => (status: Order['status']): string => {
    switch (status) {
      case 'Delivered':
        return 'text-green-500';
      case 'In Progress':
        return 'text-yellow-500';
      case 'Cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }, []);

  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        <ul className="space-y-4" aria-label="Order list">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{order.name}</span>
                  <div className="text-sm text-gray-500">{order.date}</div>
                </div>
                <span className={`text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
