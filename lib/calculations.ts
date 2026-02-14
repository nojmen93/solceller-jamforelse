/**
 * Solar calculation logic for Sweden.
 * Uses typical Swedish insolation and orientation factors.
 */

// Full sun hours per year by orientation (south = 1, approximate for central Sweden ~55°N)
const ORIENTATION_FACTOR: Record<string, number> = {
  S: 1.0,
  SV: 0.95,
  SÖ: 0.95,
  V: 0.82,
  Ö: 0.82,
  NV: 0.65,
  NÖ: 0.65,
  N: 0.55,
};

// Tilt factor: optimal ~35° in Sweden. Normalized so 35° = 1.
function tiltFactor(angleDeg: number): number {
  const optimal = 35;
  const diff = Math.abs(angleDeg - optimal);
  if (diff <= 10) return 1.0;
  if (diff <= 25) return 0.95;
  if (diff <= 45) return 0.88;
  return 0.78;
}

// Average full sun hours per year in central Sweden (kWh/kWp/year, approximate)
const BASE_HOURS_SWEDEN = 950;

/**
 * Estimated annual production in kWh for a given system in Sweden.
 */
export function estimateAnnualProductionKwh(
  kwp: number,
  roofAngle: number,
  roofOrientation: string
): number {
  const orient = ORIENTATION_FACTOR[roofOrientation.toUpperCase()] ?? 0.9;
  const tilt = tiltFactor(roofAngle);
  return Math.round(kwp * BASE_HOURS_SWEDEN * orient * tilt);
}

/**
 * Recommend system size (kWp) from roof area and consumption.
 * Panel power ~200 W/m² usable roof → ~0.2 kWp per m². We use 0.18 for safety/margin.
 */
export function recommendSystemKwp(
  roofAreaSqm: number,
  annualConsumptionKwh: number,
  roofAngle: number,
  roofOrientation: string
): number {
  const maxKwpFromRoof = roofAreaSqm * 0.18;
  let kwp = Math.min(maxKwpFromRoof, annualConsumptionKwh / 800); // 800 kWh/kWp rough target
  kwp = Math.max(1.5, Math.min(50, kwp));
  return Math.round(kwp * 10) / 10;
}

/**
 * Typical cost per kWp in SEK (2024–2025 range for Sweden).
 */
const DEFAULT_PRICE_PER_KWP_SEK = 16500;

export function estimateCostSek(kwp: number, pricePerKwpSek: number = DEFAULT_PRICE_PER_KWP_SEK): number {
  return Math.round(kwp * pricePerKwpSek);
}

/**
 * Average electricity price SEK/kWh (household, Sweden).
 */
const DEFAULT_ELECTRICITY_PRICE_SEK = 2.2;

/**
 * Payback in years: investment / annual savings.
 */
export function paybackYears(
  investmentSek: number,
  annualProductionKwh: number,
  electricityPriceSekPerKwh: number = DEFAULT_ELECTRICITY_PRICE_SEK
): number {
  const annualSavings = annualProductionKwh * electricityPriceSekPerKwh;
  if (annualSavings <= 0) return 99;
  const years = investmentSek / annualSavings;
  return Math.round(Math.min(99, years) * 10) / 10;
}

/**
 * CO2 reduction: Swedish grid ~25 g CO2/kWh (low carbon). Avoided emissions.
 */
const CO2_GRID_GRAM_PER_KWH = 25;

export function co2ReductionKg(annualProductionKwh: number): number {
  return Math.round((annualProductionKwh * CO2_GRID_GRAM_PER_KWH) / 1000);
}

export interface SolarCalculationInput {
  roofAreaSqm: number;
  roofAngle: number;
  roofOrientation: string;
  annualConsumptionKwh: number;
  electricityPriceSekPerKwh?: number;
  pricePerKwpSek?: number;
}

export interface SolarCalculationOutput {
  recommendedKwp: number;
  estimatedCostSek: number;
  paybackYears: number;
  annualProductionKwh: number;
  co2ReductionKg: number;
}

/**
 * Full solar calculation for Sweden.
 */
export function runSolarCalculation(input: SolarCalculationInput): SolarCalculationOutput {
  const {
    roofAreaSqm,
    roofAngle,
    roofOrientation,
    annualConsumptionKwh,
    electricityPriceSekPerKwh = DEFAULT_ELECTRICITY_PRICE_SEK,
    pricePerKwpSek = DEFAULT_PRICE_PER_KWP_SEK,
  } = input;

  const recommendedKwp = recommendSystemKwp(
    roofAreaSqm,
    annualConsumptionKwh,
    roofAngle,
    roofOrientation
  );
  const estimatedCostSek = estimateCostSek(recommendedKwp, pricePerKwpSek);
  const annualProductionKwh = estimateAnnualProductionKwh(
    recommendedKwp,
    roofAngle,
    roofOrientation
  );
  const paybackYearsResult = paybackYears(
    estimatedCostSek,
    annualProductionKwh,
    electricityPriceSekPerKwh
  );
  const co2ReductionKgResult = co2ReductionKg(annualProductionKwh);

  return {
    recommendedKwp,
    estimatedCostSek,
    paybackYears: paybackYearsResult,
    annualProductionKwh,
    co2ReductionKg: co2ReductionKgResult,
  };
}
