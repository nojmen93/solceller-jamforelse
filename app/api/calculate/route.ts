import { NextResponse } from "next/server";
import { calculatorSchema } from "@/lib/types";
import { runSolarCalculation } from "@/lib/calculations";
import type { CalculationResult } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = calculatorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ogiltig indata", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const {
      roofAreaSqm,
      roofAngle,
      roofOrientation,
      annualConsumptionKwh,
    } = parsed.data;

    const result = runSolarCalculation({
      roofAreaSqm,
      roofAngle,
      roofOrientation,
      annualConsumptionKwh,
    });

    const response: CalculationResult = {
      ...result,
      roofAreaSqm,
      roofAngle,
      roofOrientation,
      annualConsumptionKwh,
    };

    return NextResponse.json(response);
  } catch (e) {
    console.error("Calculate error:", e);
    return NextResponse.json(
      { error: "Beräkningen misslyckades" },
      { status: 500 }
    );
  }
}
