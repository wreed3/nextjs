import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactFormData, ContactFormResponse } from '@/types';

// Rate limiting helper (simple in-memory implementation)
const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit length and trim
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactFormResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // Get IP for rate limiting
  const ip = (req.headers['x-forwarded-for'] as string) || 
              (req.socket.remoteAddress as string) || 
              'unknown';

  // Check rate limit
  if (!checkRateLimit(ip)) {
    res.status(429).json({ 
      message: 'Too many requests. Please try again later.',
      success: false 
    });
    return;
  }

  const data: ContactFormData = req.body;

  // Validation
  if (!data.email || !data.name || !data.message) {
    res.status(422).json({ 
      message: 'All fields are required',
      success: false 
    });
    return;
  }

  if (!validateEmail(data.email)) {
    res.status(422).json({ 
      message: 'Invalid email address',
      success: false 
    });
    return;
  }

  // Sanitize inputs
  const sanitizedData = {
    email: sanitizeInput(data.email),
    name: sanitizeInput(data.name),
    message: sanitizeInput(data.message),
    timestamp: new Date(),
    ip: ip,
  };

  try {
    const { db } = await connectToDatabase();
    
    await db.collection('messages').insertOne(sanitizedData);

    res.status(201).json({ 
      message: 'Message sent successfully!',
      success: true 
    });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      success: false 
    });
  }
}

export default handler;