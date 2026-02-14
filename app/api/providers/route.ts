import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const providers = await prisma.provider.findMany({
      include: {
        _count: {
          select: { products: true, reviews: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const result = providers.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      logoUrl: p.logoUrl,
      description: p.description,
      website: p.website,
      phone: p.phone,
      email: p.email,
      coverageRegions: p.coverageRegions,
      certified: p.certified,
      trustpilotScore: p.trustpilotScore != null ? Number(p.trustpilotScore) : null,
      avgInstallationDays: p.avgInstallationDays,
      productCount: p._count.products,
      reviewCount: p._count.reviews,
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("Providers API error:", e);
    return NextResponse.json(
      { error: "Kunde inte hämta leverantörer" },
      { status: 500 }
    );
  }
}
