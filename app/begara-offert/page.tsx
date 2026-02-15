"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getStoredCalculation } from "@/lib/lead-storage";
import { CheckCircle2, Loader2, FileText } from "lucide-react";
import Link from "next/link";

const offertFormSchema = z.object({
  firstName: z.string().min(1, "Förnamn krävs"),
  lastName: z.string().min(1, "Efternamn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().optional(),
  gdprConsent: z.literal(true, {
    message: "Du måste godkänna behandling av personuppgifter",
  }),
});

type OffertFormData = z.infer<typeof offertFormSchema>;

interface SubmittedLead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  recommendedKwp?: number;
  estimatedCostSek?: number;
  paybackYears?: number;
  annualProductionKwh?: number;
}

function formatSek(value: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BegaraOffertPage() {
  const [stored, setStored] = useState<ReturnType<typeof getStoredCalculation>>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedLead | null>(null);

  const form = useForm<OffertFormData>({
    resolver: zodResolver(offertFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gdprConsent: false as unknown as true,
    },
  });

  useEffect(() => {
    setStored(getStoredCalculation());
  }, []);

  const onSubmit = async (data: OffertFormData) => {
    setSubmitStatus("loading");
    setSubmitError(null);
    const calc = getStoredCalculation();
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      address: calc?.address,
      postalCode: calc?.postalCode,
      city: calc?.city,
      roofAreaSqm: calc?.result.roofAreaSqm,
      roofAngle: calc?.result.roofAngle,
      roofOrientation: calc?.result.roofOrientation,
      annualConsumptionKwh: calc?.result.annualConsumptionKwh,
      estimatedSystemKwp: calc?.result.recommendedKwp,
      estimatedCostSek: calc?.result.estimatedCostSek,
      estimatedProductionKwh: calc?.result.annualProductionKwh,
      paybackYears: calc?.result.paybackYears,
      source: "begara-offert",
      gdprConsent: true,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Något gick fel");
      }
      setSubmitStatus("success");
      setSubmittedData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: calc?.address,
        postalCode: calc?.postalCode,
        city: calc?.city,
        recommendedKwp: calc?.result.recommendedKwp,
        estimatedCostSek: calc?.result.estimatedCostSek,
        paybackYears: calc?.result.paybackYears,
        annualProductionKwh: calc?.result.annualProductionKwh,
      });
    } catch (e) {
      setSubmitStatus("error");
      setSubmitError(e instanceof Error ? e.message : "Kunde inte skicka förfrågan");
    }
  };

  if (submitStatus === "success" && submittedData) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" aria-hidden />
          </div>
          <h1 className="mt-6 text-center text-2xl font-bold text-stone-900">
            Tack! Vi kontaktar dig inom 24 timmar
          </h1>
          <p className="mt-2 text-center text-stone-600">
            Vi har tagit emot din förfrågan och återkommer till dig så snart vi kan.
          </p>

          <div className="mt-8 rounded-xl bg-stone-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Sammanfattning av din förfrågan
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-600">Namn</dt>
                <dd className="font-medium text-stone-900">
                  {submittedData.firstName} {submittedData.lastName}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-600">E-post</dt>
                <dd className="font-medium text-stone-900">{submittedData.email}</dd>
              </div>
              {submittedData.phone && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Telefon</dt>
                  <dd className="font-medium text-stone-900">{submittedData.phone}</dd>
                </div>
              )}
              {(submittedData.address || submittedData.city) && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Adress</dt>
                  <dd className="font-medium text-stone-900 text-right">
                    {[submittedData.address, submittedData.postalCode, submittedData.city]
                      .filter(Boolean)
                      .join(", ")}
                  </dd>
                </div>
              )}
              {submittedData.recommendedKwp != null && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Rekommenderad systemstorlek</dt>
                  <dd className="font-medium text-stone-900">
                    {submittedData.recommendedKwp} kWp
                  </dd>
                </div>
              )}
              {submittedData.estimatedCostSek != null && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Uppskattad kostnad</dt>
                  <dd className="font-medium text-stone-900">
                    {formatSek(submittedData.estimatedCostSek)}
                  </dd>
                </div>
              )}
              {submittedData.paybackYears != null && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Återbetalningstid</dt>
                  <dd className="font-medium text-stone-900">
                    {submittedData.paybackYears} år
                  </dd>
                </div>
              )}
              {submittedData.annualProductionKwh != null && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Årlig produktion</dt>
                  <dd className="font-medium text-stone-900">
                    {submittedData.annualProductionKwh.toLocaleString("sv-SE")} kWh
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-yellow-500 px-5 py-2.5 font-semibold text-stone-900 transition hover:bg-yellow-600"
            >
              Tillbaka till startsidan
            </Link>
            <Link
              href="/jamfor"
              className="rounded-xl border border-stone-300 px-5 py-2.5 font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Jämför produkter
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-stone-900">Begär offert</h1>
      <p className="mt-1 text-stone-600">
        Fyll i dina uppgifter så återkommer vi med ett personligt erbjudande.
      </p>

      {stored && (
        <div className="mt-6 rounded-xl border border-yellow-200 bg-amber-50/50 p-4">
          <p className="text-sm font-medium text-stone-700">
            Din beräkning används i förfrågan
          </p>
          <p className="mt-1 text-sm text-stone-600">
            {stored.result.recommendedKwp} kWp ·{" "}
            {formatSek(stored.result.estimatedCostSek)} ·{" "}
            {stored.result.paybackYears} år återbetalning
            {stored.address && ` · ${stored.address}, ${stored.postalCode} ${stored.city}`}
          </p>
        </div>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-stone-700">
              Förnamn *
            </label>
            <input
              {...form.register("firstName")}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="Anna"
            />
            {form.formState.errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">
              Efternamn *
            </label>
            <input
              {...form.register("lastName")}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="Andersson"
            />
            {form.formState.errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-stone-700">
            E-post *
          </label>
          <input
            type="email"
            {...form.register("email")}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            placeholder="anna.andersson@example.com"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-stone-700">
            Telefon
          </label>
          <input
            type="tel"
            {...form.register("phone")}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            placeholder="070-123 45 67"
          />
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...form.register("gdprConsent")}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-sm text-stone-700">
              Jag godkänner att mina uppgifter används för att hantera min
              förfrågan och att ni kontaktar mig. Läs vår{" "}
              <a href="/integritet" className="underline hover:text-yellow-600">
                integritetspolicy
              </a>
              . *
            </span>
          </label>
          {form.formState.errors.gdprConsent && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.gdprConsent.message}
            </p>
          )}
        </div>

        {submitStatus === "error" && submitError && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 font-semibold text-stone-900 transition hover:bg-yellow-600 disabled:opacity-70"
          >
            {submitStatus === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
            {submitStatus === "loading" ? "Skickar..." : "Skicka förfrågan"}
          </button>
          <Link
            href="/kalkylator"
            className="text-sm font-medium text-stone-600 hover:text-yellow-600"
          >
            Tillbaka till kalkylatorn
          </Link>
        </div>
      </form>
    </main>
  );
}
