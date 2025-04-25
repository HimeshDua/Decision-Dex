'use server';

import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const {decision, userId} = body;

  if (!decision || !userId) {
    return new Response('Missing required fields', {status: 400});
  }

  try {
    const {title, description: userDecision, options} = decision;

    const newDecision = await prisma.decision.create({
      data: {
        title: title || 'Untitled Decision',
        userDecision,
        user: {connect: {id: userId}},
        options: {
          create: options.map((option: any) => ({
            title: option.title || 'Untitled Option',
            pros: {
              create: option.pros.map((pro: string) => ({content: pro}))
            },
            cons: {
              create: option.cons.map((con: string) => ({content: con}))
            }
          }))
        }
      }
    });

    return new Response(
      JSON.stringify({
        message: 'Decision saved successfully',
        decisionId: newDecision.id
      }),
      {status: 200}
    );
  } catch (error) {
    console.error('Error saving decision:', error);
    return new Response('Internal Server Error', {status: 500});
  }
}
