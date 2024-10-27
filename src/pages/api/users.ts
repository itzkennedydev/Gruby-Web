import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Define user-related types
interface UserData {
  user_id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the required environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ message: 'Supabase credentials are not set' });
  }

  // Get userId and token from Clerk
  const { userId, getToken } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Retrieve the Supabase access token
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  // Initialize Supabase client
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });

  // Handle POST requests (create a new user)
  if (req.method === 'POST') {
    const { email, name, avatar_url } = req.body as UserData;

    // Ensure required fields are provided
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    try {
      // Check if the user already exists in the database
      const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (selectError) {
        throw selectError;
      }

      if (existingUser) {
        return res.status(200).json({ message: 'User already exists' });
      }

      // Insert new user data into the database
      const { error: insertError } = await supabase.from('users').insert({
        user_id: userId,
        email,
        name,
        avatar_url,
      });

      if (insertError) {
        throw insertError;
      }

      return res.status(201).json({ message: 'User inserted successfully' });
    } catch (error) {
      console.error('Error inserting user:', error);
      return res.status(500).json({ message: 'Error inserting user' });
    }
  }

  // Handle GET requests (fetch user's own data)
  else if (req.method === 'GET') {
    try {
      const { data: userData, error }: { data: UserData | null; error: unknown } = await supabase
        .from('users')
        .select()
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching user data' });
    }
  }

  // Handle unsupported HTTP methods
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
