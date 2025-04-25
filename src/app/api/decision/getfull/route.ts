// Fetch all decisions from the user
'use server';

import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const {userId} = body;

  console.log('User ID:', userId);

  if (!userId) {
    return new Response('Missing required fields', {status: 400});
  }

  try {
    const getDecision = await prisma.decision.findMany({
      where: {userId},
      orderBy: {createdAt: 'desc'}
      // select: {
      //   options: true,
      // }
    });

    if (!getDecision) {
      return new Response('No decisions found', {status: 404});
    }

    return new Response(JSON.stringify(getDecision), {status: 200});
  } catch (error) {
    console.error('Error saving decision:', error);
    return new Response('Internal Server Error', {status: 500});
  }
}
