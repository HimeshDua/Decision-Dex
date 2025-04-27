import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

interface Option {
  id: string;
  title: string;
  pros: {id: string; content: string}[];
  cons: {id: string; content: string}[];
}

interface Decision {
  id: string;
  title: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  options: Option[];
  description: string | null;
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const decision: Decision = body.decision;
    const {id: decisionId, description, options, status, title} = decision;
    console.log(body);

    if (!decision || !title || !status || !options || !decisionId) {
      return NextResponse.json(
        {message: 'Missing required fields'},
        {status: 400}
      );
    }

    const existingDecision = await prisma.decision.findUnique({
      where: {id: decisionId}
    });

    if (!existingDecision) {
      return NextResponse.json({message: 'Decision not found'}, {status: 404});
    }

    const updatedDecision = await prisma.$transaction(async (tx) => {
      // Update decision and its options, pros, and cons
      await tx.decision.update({
        where: {id: decisionId},
        data: {
          title: title,
          status: status,
          userDecision: description || '',
          updatedAt: new Date(),
          options: {
            deleteMany: {}, // Delete all existing options
            create: options.map((option) => ({
              id: option.id,
              title: option.title,
              pros: {
                create: option.pros.map((pro) => ({
                  id: pro.id,
                  content: pro.content
                }))
              },
              cons: {
                create: option.cons.map((con) => ({
                  id: con.id,
                  content: con.content
                }))
              }
            }))
          }
        }
      });

      // Fetch the updated decision
      const decision = await tx.decision.findUnique({
        where: {id: decisionId},
        include: {options: {include: {pros: true, cons: true}}}
      });
      return decision;
    });

    return NextResponse.json(updatedDecision, {status: 200});
  } catch (error: any) {
    console.error('Error updating decision:', error);
    return NextResponse.json(
      {message: `Failed to update decision: ${error.message}`},
      {status: 500}
    );
  }
}
