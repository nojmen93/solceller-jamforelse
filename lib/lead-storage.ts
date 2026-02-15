import type { CalculationResult } from "@/lib/types";

export const CALCULATION_STORAGE_KEY = "solceller-calculation";

export interface StoredCalculation {
  result: CalculationResult;
  address?: string;
  postalCode?: string;
  city?: string;
}

export function getStoredCalculation(): StoredCalculation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CALCULATION_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredCalculation;
    if (!data?.result) return null;
    return data;
  } catch {
    return null;
  }
}

export function setStoredCalculation(stored: StoredCalculation): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CALCULATION_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // ignore
  }
}

export function clearStoredCalculation(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CALCULATION_STORAGE_KEY);
  } catch {
    // ignore
  }
}
