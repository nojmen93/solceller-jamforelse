import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productFiltersSchema } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = {
      minKwp: searchParams.get("minKwp") ?? undefined,
      maxKwp: searchParams.get("maxKwp") ?? undefined,
      maxPriceSek: searchParams.get("maxPriceSek") ?? undefined,
      providerId: searchParams.get("providerId") ?? undefined,
      providerSlug: searchParams.get("providerSlug") ?? undefined,
    };
    const filters = productFiltersSchema.safeParse(raw);
    const params = filters.success ? filters.data : {};

    const where: {
      available?: boolean;
      totalKwp?: { gte?: number; lte?: number };
      basePriceSek?: { lte?: number };
      providerId?: string;
      provider?: { slug?: string };
    } = { available: true };

    if (params.minKwp != null) {
      where.totalKwp = { ...where.totalKwp, gte: params.minKwp };
    }
    if (params.maxKwp != null) {
      where.totalKwp = { ...where.totalKwp, lte: params.maxKwp };
    }
    if (params.maxPriceSek != null) {
      where.basePriceSek = { lte: params.maxPriceSek };
    }
    if (params.providerId) {
      where.providerId = params.providerId;
    }
    if (params.providerSlug) {
      where.provider = { slug: params.providerSlug };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
            trustpilotScore: true,
          },
        },
      },
      orderBy: [{ basePriceSek: "asc" }],
    });

    return NextResponse.json(products);
  } catch (e) {
    console.error("Products API error:", e);
    return NextResponse.json(
      { error: "Kunde inte hämta produkter" },
      { status: 500 }
    );
  }
}
