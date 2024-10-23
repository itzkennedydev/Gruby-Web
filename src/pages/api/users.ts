// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, getToken } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const supabaseAccessToken = await getToken({ template: 'supabase' });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  );

  if (req.method === 'POST') {
    const { email, name, avatar_url } = req.body;

    // Check if the user already exists
    const { data, error: selectError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (selectError) {
      console.error('Error checking user existence:', selectError);
      return res.status(500).json({ message: 'Error checking user existence' });
    }

    if (data) {
      // User already exists
      return res.status(200).json({ message: 'User already exists' });
    }

    // Insert new user
    const { error: insertError } = await supabase.from('users').insert({
      user_id: userId,
      email,
      name,
      avatar_url,
    });

    if (insertError) {
      console.error('Error inserting user:', insertError);
      return res.status(500).json({ message: 'Error inserting user' });
    }

    return res.status(201).json({ message: 'User inserted' });
  } else if (req.method === 'GET') {
    // Fetch user's own data
    const { data: userData, error } = await supabase
      .from('users')
      .select()
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching user data' });
    }

    res.status(200).json(userData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
