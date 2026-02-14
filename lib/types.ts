import { z } from "zod";

// Calculator step schemas
export const calculatorAddressSchema = z.object({
  address: z.string().min(3, "Ange en giltig adress"),
  postalCode: z.string().regex(/^\d{3}\s?\d{2}$/, "Ange ett giltigt postnummer (XXX XX)"),
  city: z.string().min(2, "Ange stad"),
});

export const calculatorRoofSchema = z.object({
  roofAreaSqm: z.coerce.number().min(10, "Minst 10 m²").max(500, "Max 500 m²"),
  roofAngle: z.coerce.number().min(0, "0–90°").max(90, "0–90°"),
  roofOrientation: z.enum(["S", "SV", "SÖ", "V", "Ö", "NV", "NÖ", "N"], {
    message: "Välj takriktning",
  }),
});

export const calculatorConsumptionSchema = z.object({
  annualConsumptionKwh: z.coerce.number().min(1000, "Minst 1000 kWh").max(50000, "Max 50 000 kWh"),
});

export const calculatorSchema = calculatorAddressSchema
  .merge(calculatorRoofSchema)
  .merge(calculatorConsumptionSchema);

export type CalculatorAddressInput = z.infer<typeof calculatorAddressSchema>;
export type CalculatorRoofInput = z.infer<typeof calculatorRoofSchema>;
export type CalculatorConsumptionInput = z.infer<typeof calculatorConsumptionSchema>;
export type CalculatorInput = z.infer<typeof calculatorSchema>;

// Lead submission
export const leadSchema = z.object({
  firstName: z.string().min(1, "Förnamn krävs").optional(),
  lastName: z.string().min(1, "Efternamn krävs").optional(),
  email: z.string().email("Ogiltig e-post"),
  phone: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  roofType: z.string().optional(),
  roofAreaSqm: z.coerce.number().optional(),
  roofAngle: z.coerce.number().optional(),
  roofOrientation: z.string().optional(),
  annualConsumptionKwh: z.coerce.number().optional(),
  estimatedSystemKwp: z.coerce.number().optional(),
  estimatedCostSek: z.coerce.number().optional(),
  estimatedProductionKwh: z.coerce.number().optional(),
  paybackYears: z.coerce.number().optional(),
  source: z.string().optional(),
  preferredProviderIds: z.array(z.string()).optional(),
  gdprConsent: z.literal(true, {
    message: "Du måste godkänna behandling av personuppgifter",
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Product filters (query params)
export const productFiltersSchema = z.object({
  minKwp: z.coerce.number().optional(),
  maxKwp: z.coerce.number().optional(),
  maxPriceSek: z.coerce.number().optional(),
  providerId: z.string().optional(),
  providerSlug: z.string().optional(),
});

export type ProductFilters = z.infer<typeof productFiltersSchema>;

// API response types
export interface CalculationResult {
  recommendedKwp: number;
  estimatedCostSek: number;
  paybackYears: number;
  annualProductionKwh: number;
  co2ReductionKg: number;
  roofAreaSqm: number;
  roofAngle: number;
  roofOrientation: string;
  annualConsumptionKwh: number;
}
