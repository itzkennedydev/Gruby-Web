import { IncomingHttpHeaders } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { buffer } from 'micro';
import { eq } from 'drizzle-orm';

import { users } from '../../../server/db/schema';
import { db } from "../../../server/db";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET ?? '';

export const config = {
    api: {
        bodyParser: false,
    },
};

interface UserAttributes {
    email_addresses: { email_address: string }[];
    first_name?: string;
    last_name?: string;
}

interface WebhookEvent {
    data: { id: string } & UserAttributes;
    type: 'user.created' | 'user.updated' | 'user.deleted';
}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log('Webhook handler triggered');

    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    let payload: string;
    try {
        payload = (await buffer(req)).toString();
        console.log('Received payload:', payload);
    } catch (error) {
        console.error('Error reading payload:', error);
        res.status(400).json({ message: 'Error reading payload' });
        return;
    }

    const headers = req.headers as IncomingHttpHeaders & WebhookRequiredHeaders;

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(payload, headers) as WebhookEvent;
        console.log('Verified webhook event:', evt);
    } catch (err) {
        console.error('Error verifying webhook:', err);
        res.status(400).json({ message: 'Invalid signature' });
        return;
    }

    const { id, ...attributes } = evt.data;

    console.log('Processing event:', evt.type, 'for user:', id);

    try {
        switch (evt.type) {
            case 'user.created':
            case 'user.updated':
                const result = await db.insert(users).values({
                    user_id: id,
                    email: attributes.email_addresses[0]?.email_address ?? '',
                    name: `${attributes.first_name ?? ''} ${attributes.last_name ?? ''}`.trim() || null,
                }).onConflictDoUpdate({
                    target: users.user_id,
                    set: {
                        email: attributes.email_addresses[0]?.email_address ?? '',
                        name: `${attributes.first_name ?? ''} ${attributes.last_name ?? ''}`.trim() || null,
                    },
                });
                console.log('User upsert result:', result);
                break;
            case 'user.deleted':
                const deleteResult = await db.delete(users).where(eq(users.user_id, id));
                console.log('User delete result:', deleteResult);
                break;
            default:
                console.log(`Unhandled event type: ${evt.type}`);
        }

        res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Error processing webhook' });
    }
};

export default handler;
