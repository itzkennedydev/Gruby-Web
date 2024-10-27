import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  quantity: number;
  name: string;
  price: string;
}

interface OrderDetails {
  items?: OrderItem[];
  total_amount?: string;
}

interface ResendError {
  message: string;
  statusCode?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const auth = getAuth(req);

  if (!auth.userId || !auth.sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Fetch user details separately
  const user = await clerkClient.users.getUser(auth.userId);

  if (!user.emailAddresses?.[0]?.emailAddress) {
    return res.status(401).json({ message: 'Unauthorized or missing email' });
  }

  const { orderDetails } = req.body as { orderDetails: OrderDetails };

  if (!orderDetails?.items || !orderDetails?.total_amount) {
    return res.status(400).json({
      message: 'Missing required fields',
      details: {
        items: !orderDetails?.items ? 'Order items are required' : null,
        total: !orderDetails?.total_amount ? 'Total amount is required' : null
      }
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ message: 'Email service configuration error' });
  }

  try {
    const formattedItems = orderDetails.items.map(item => ({
      ...item,
      price: parseFloat(item.price).toFixed(2)
    }));

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #2c3e50;">Order Confirmation</h1>
          <p>Thank you for your order!</p>
          <h2 style="color: #34495e;">Order Details:</h2>
          <ul style="list-style-type: none; padding: 0;">
            ${formattedItems.map(item => `
              <li style="margin-bottom: 10px;">
                ${item.quantity}x ${item.name} - $${item.price}
              </li>
            `).join('')}
          </ul>
          <p style="font-weight: bold; font-size: 1.2em;">
            Total: $${parseFloat(orderDetails.total_amount).toFixed(2)}
          </p>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: 'Gruby <orders@gruby.io>',
      to: [user.emailAddresses[0].emailAddress],
      subject: 'Order Confirmation',
      html: htmlContent.trim(),
      replyTo: 'support@gruby.io'
    });

    if (response.error) {
      const resendError = response.error as ResendError;
      console.error('Resend API Error:', resendError);
      return res.status(500).json({
        message: 'Failed to send email',
        error: resendError.message,
        code: resendError.statusCode || 'Unknown'
      });
    }

    res.status(200).json({
      message: 'Email sent successfully',
      data: response.data
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown'
    });
  }
}
