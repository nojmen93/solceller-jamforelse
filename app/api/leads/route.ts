import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { error: "Ogiltig indata", details },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        firstName: data.firstName ?? undefined,
        lastName: data.lastName ?? undefined,
        email: data.email,
        phone: data.phone ?? undefined,
        address: data.address ?? undefined,
        postalCode: data.postalCode ?? undefined,
        city: data.city ?? undefined,
        roofType: data.roofType ?? undefined,
        roofAreaSqm: data.roofAreaSqm ?? undefined,
        roofAngle: data.roofAngle ?? undefined,
        roofOrientation: data.roofOrientation ?? undefined,
        annualConsumptionKwh: data.annualConsumptionKwh ?? undefined,
        estimatedSystemKwp: data.estimatedSystemKwp ?? undefined,
        estimatedCostSek: data.estimatedCostSek ?? undefined,
        estimatedProductionKwh: data.estimatedProductionKwh ?? undefined,
        paybackYears: data.paybackYears ?? undefined,
        source: data.source ?? undefined,
        gdprConsent: data.gdprConsent === true,
        preferredProviders:
          data.preferredProviderIds?.length != null &&
          data.preferredProviderIds.length > 0
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
