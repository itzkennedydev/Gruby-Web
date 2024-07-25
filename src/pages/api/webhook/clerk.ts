import { IncomingHttpHeaders } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { buffer } from 'micro';

import { users } from '~/server/db/schema';
import {db} from "~/server/db";

const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET || '';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Webhook handler triggered');

    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    let payload;
    try {
        payload = (await buffer(req)).toString();
        console.log('Received payload:', payload);
    } catch (error) {
        console.error('Error reading payload:', error);
        return res.status(400).json({ message: 'Error reading payload' });
    }

    const headers = req.headers as IncomingHttpHeaders & WebhookRequiredHeaders;

    const wh = new Webhook(webhookSecret);
    let evt: any;

    try {
        evt = wh.verify(payload, headers);
        console.log('Verified webhook event:', evt);
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).json({ message: 'Invalid signature' });
    }

    const { id, ...attributes } = evt.data;

    console.log('Processing event:', evt.type, 'for user:', id);

    try {
        switch (evt.type) {
            case 'user.created':
            case 'user.updated':
                const result = await db.insert(users).values({
                    id,
                    email: attributes.email_addresses[0].email_address,
                    firstName: attributes.first_name,
                    lastName: attributes.last_name,
                }).onConflictDoUpdate({
                    target: users.id,
                    set: {
                        email: attributes.email_addresses[0].email_address,
                        firstName: attributes.first_name,
                        lastName: attributes.last_name,
                    },
                });
                console.log('User upsert result:', result);
                break;
            case 'user.deleted':
                const deleteResult = await db.delete(users).where({ id });
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