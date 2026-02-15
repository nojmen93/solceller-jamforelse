import { NextRequest, NextResponse } from 'next/server';
import { LeadFormSchema } from '@/lib/types';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('Received lead data:', body);
    
    const validatedData = LeadFormSchema.parse(body);
    
    const { preferredProviderIds, ...leadData } = validatedData;
    
    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        status: 'new',
        preferredProviders: preferredProviderIds && preferredProviderIds.length > 0
          ? {
              connect: preferredProviderIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
    
    console.log('Lead created:', lead.id);
    
    return NextResponse.json({
      leadId: lead.id,
      status: 'sent',
      providersContacted: preferredProviderIds?.length || 0,
      estimatedResponseTimeHours: 24,
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, details: error.stack },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}