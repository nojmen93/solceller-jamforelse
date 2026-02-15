import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ogiltig indata", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        roofType: data.roofType,
        roofAreaSqm: data.roofAreaSqm,
        roofAngle: data.roofAngle,
        roofOrientation: data.roofOrientation,
        annualConsumptionKwh: data.annualConsumptionKwh,
        estimatedSystemKwp: data.estimatedSystemKwp,
        estimatedCostSek: data.estimatedCostSek,
        estimatedProductionKwh: data.estimatedProductionKwh,
        paybackYears: data.paybackYears,
        source: data.source,
        gdprConsent: Boolean(data.gdprConsent),
        preferredProviders: data.preferredProviderIds?.length
          ? { connect: data.preferredProviderIds.map((id) => ({ id })) }
          : undefined,
      },
    });

    return NextResponse.json({
      id: lead.id,
      success: true,
      message: "Förfrågan mottagen. Vi återkommer inom 24 timmar.",
    });
  } catch (e) {
    console.error("Leads API error:", e);
    return NextResponse.json(
      { error: "Kunde inte spara förfrågan" },
      { status: 500 }
    );
  }
}
