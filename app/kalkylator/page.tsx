"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  calculatorAddressSchema,
  calculatorRoofSchema,
  calculatorConsumptionSchema,
  type CalculatorInput,
  type CalculationResult,
} from "@/lib/types";
import { CalculatorResultDisplay } from "@/components/CalculatorResultDisplay";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, title: "Adress" },
  { id: 2, title: "Tak" },
  { id: 3, title: "Förbrukning" },
  { id: 4, title: "Sammanfattning" },
];

const ORIENTATION_OPTIONS = [
  { value: "S", label: "Syd" },
  { value: "SV", label: "Sydväst" },
  { value: "SÖ", label: "Sydöst" },
  { value: "V", label: "Väst" },
  { value: "Ö", label: "Öst" },
  { value: "NV", label: "Nordväst" },
  { value: "NÖ", label: "Nordöst" },
  { value: "N", label: "Nord" },
];

export default function KalkylatorPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [products, setProducts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Partial<CalculatorInput>>({
    defaultValues: {
      address: "",
      postalCode: "",
      city: "",
      roofAreaSqm: undefined,
      roofAngle: 35,
      roofOrientation: "S",
      annualConsumptionKwh: undefined,
    },
    mode: "onChange",
  });

  const addressValid =
    step > 1 ||
    (form.watch("address") &&
      form.watch("postalCode") &&
      form.watch("city"));
  const roofValid =
    step > 2 ||
    (form.watch("roofAreaSqm") != null &&
      form.watch("roofAngle") != null &&
      form.watch("roofOrientation"));
  const consumptionValid =
    step > 3 || form.watch("annualConsumptionKwh") != null;

  const validateStep = (): boolean => {
    const values = form.getValues();
    if (step === 1) {
      const r = calculatorAddressSchema.safeParse(values);
      if (!r.success) {
        r.error.issues.forEach((e) => {
          const path = e.path[0] as keyof CalculatorInput;
          form.setError(path, { message: e.message });
        });
        return false;
      }
    }
    if (step === 2) {
      const r = calculatorRoofSchema.safeParse(values);
      if (!r.success) {
        r.error.issues.forEach((e) => {
          const path = e.path[0] as keyof CalculatorInput;
          form.setError(path, { message: e.message });
        });
        return false;
      }
    }
    if (step === 3) {
      const r = calculatorConsumptionSchema.safeParse(values);
      if (!r.success) {
        r.error.issues.forEach((e) => {
          const path = e.path[0] as keyof CalculatorInput;
          form.setError(path, { message: e.message });
        });
        return false;
      }
    }
    return true;
  };

  const onNext = async () => {
    if (step < 4 && !validateStep()) return;
    if (step === 4) {
      const values = form.getValues();
      const full = {
        ...values,
        postalCode: values.postalCode?.replace(/\s/g, "").replace(/(\d{3})(\d{2})/, "$1 $2"),
      };
      const r = calculatorAddressSchema.merge(calculatorRoofSchema).merge(calculatorConsumptionSchema).safeParse(full);
      if (!r.success) return;
      setLoading(true);
      setError(null);
      const payload = r.data;
      try {
        const calcRes = await fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!calcRes.ok) {
          const err = await calcRes.json();
          throw new Error(err.error || "Beräkning misslyckades");
        }
        const data: CalculationResult = await calcRes.json();
        setResult(data);
        const kwp = data.recommendedKwp;
        const productsRes = await fetch(
          `/api/products?minKwp=${Math.max(0, kwp - 2)}&maxKwp=${kwp + 2}`
        );
        if (productsRes.ok) {
          const list = await productsRes.json();
          setProducts(list);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Något gick fel");
      } finally {
        setLoading(false);
      }
      return;
    }
    setStep((s) => s + 1);
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  if (result) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Dina beräkningsresultat
        </h1>
        <CalculatorResultDisplay
          result={result}
          products={products as Parameters<typeof CalculatorResultDisplay>[0]["products"]}
        />
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setStep(1);
              form.reset();
            }}
            className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
          >
            Gör en ny beräkning
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-stone-900">Solcellsberäkning</h1>
      <p className="mt-1 text-stone-600">
        Fyll i steg för steg för att få en uppskattning.
      </p>

      <div className="mt-8 flex gap-2">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`h-1.5 flex-1 rounded-full ${
              step >= s.id ? "bg-yellow-500" : "bg-stone-200"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-900">Steg 1: Adress</h2>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Gatuadress
              </label>
              <input
                {...form.register("address")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="Storgatan 1"
              />
              {form.formState.errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Postnummer
                </label>
                <input
                  {...form.register("postalCode")}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  placeholder="123 45"
                />
                {form.formState.errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.postalCode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Ort
                </label>
                <input
                  {...form.register("city")}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  placeholder="Stockholm"
                />
                {form.formState.errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-900">Steg 2: Tak</h2>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Takyta (m²)
              </label>
              <input
                type="number"
                {...form.register("roofAreaSqm")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="80"
                min={10}
                max={500}
              />
              {form.formState.errors.roofAreaSqm && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.roofAreaSqm.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Taklutning (grader, 0–90)
              </label>
              <input
                type="number"
                {...form.register("roofAngle")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                min={0}
                max={90}
              />
              {form.formState.errors.roofAngle && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.roofAngle.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Takriktning
              </label>
              <select
                {...form.register("roofOrientation")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              >
                {ORIENTATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-900">
              Steg 3: Årlig elförbrukning
            </h2>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Årlig förbrukning (kWh)
              </label>
              <input
                type="number"
                {...form.register("annualConsumptionKwh")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="8000"
                min={1000}
                max={50000}
              />
              <p className="mt-1 text-xs text-stone-500">
                Hitta siffran på din elräkning eller i elavtalet.
              </p>
              {form.formState.errors.annualConsumptionKwh && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.annualConsumptionKwh.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-900">Steg 4: Sammanfattning</h2>
            <div className="rounded-xl bg-stone-50 p-4 text-sm">
              <p>
                <strong>Adress:</strong> {form.watch("address")},{" "}
                {form.watch("postalCode")} {form.watch("city")}
              </p>
              <p className="mt-2">
                <strong>Tak:</strong> {form.watch("roofAreaSqm")} m²,{" "}
                {form.watch("roofAngle")}°,{" "}
                {ORIENTATION_OPTIONS.find((o) => o.value === form.watch("roofOrientation"))?.label}
              </p>
              <p className="mt-2">
                <strong>Förbrukning:</strong>{" "}
                {form.watch("annualConsumptionKwh")?.toLocaleString("sv-SE")} kWh/år
              </p>
            </div>
            <p className="text-sm text-stone-600">
              Klicka på &quot;Beräkna&quot; för att se rekommenderad systemstorlek,
              kostnad och återbetalningstid.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-50 hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={
              loading ||
              (step === 1 && !addressValid) ||
              (step === 2 && !roofValid) ||
              (step === 3 && !consumptionValid)
            }
            className="inline-flex items-center gap-1 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-stone-900 disabled:opacity-50 hover:bg-yellow-600"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : step === 4 ? (
              "Beräkna"
            ) : (
              <>
                Nästa
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
