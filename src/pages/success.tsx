import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();
  const { sessionId } = router.query;
  const { user } = useUser();

  useEffect(() => {
    if (sessionId && user) {
      fetch(`/api/checkout-sessions/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          // Create the order in your database
          return fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: sessionId,
              // No need to include userId here as it's handled by the API
            }),
          });
        })
        .then(res => res.json())
        .then(orderData => {
          console.log('Order created:', orderData);
        })
        .catch(err => console.error('Error:', err));
    }
  }, [sessionId, user]);

  // ... rest of the component
}
