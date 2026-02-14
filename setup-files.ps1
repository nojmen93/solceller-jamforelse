# Complete Solceller MVP File Generator
# Run with: .\setup-files.ps1

Write-Host "Creating directory structure..." -ForegroundColor Green

# Create directories
$dirs = @(
    "lib",
    "components",
    "app\api\calculate",
    "app\api\products",
    "app\api\providers",
    "app\api\leads",
    "app\kalkylator",
    "app\jamfor",
    "app\leverantorer",
    "app\admin"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Write-Host "Creating lib files..." -ForegroundColor Green

# lib/db.ts
@"
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
"@ | Out-File -FilePath "lib\db.ts" -Encoding utf8

# lib/types.ts
@"
import { z } from 'zod';

export const CalculatorInputSchema = z.object({
  address: z.string().min(1, 'Adress krävs'),
  roofAreaSqm: z.number().min(20, 'Minst 20 m²').max(300, 'Max 300 m²'),
  roofAngle: z.number().min(0).max(60),
  roofOrientation: z.enum(['south', 'southeast', 'southwest', 'east', 'west', 'north']),
  annualConsumptionKwh: z.number().min(1000).max(50000),
  electricityPriceSek: z.number().min(0.5).max(5).default(1.5),
});

export type CalculatorInput = z.infer<typeof CalculatorInputSchema>;

export interface CalculatorResult {
  estimatedProductionKwh: number;
  recommendedKwp: number;
  estimatedCostSek: number;
  paybackYears: number;
  annualSavingsSek: number;
  co2ReductionKg: number;
  availableProducts: Array<{
    id: string;
    name: string;
    providerName: string;
    totalKwp: number;
    totalPrice: number;
    pricePerKwp: number;
  }>;
}

export const LeadFormSchema = z.object({
  firstName: z.string().min(2, 'Förnamn krävs'),
  lastName: z.string().min(2, 'Efternamn krävs'),
  email: z.string().email('Ogiltig e-postadress'),
  phone: z.string().min(10, 'Telefonnummer krävs'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Du måste godkänna villkoren',
  }),
  preferredProviderIds: z.array(z.string()).optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;
"@ | Out-File -FilePath "lib\types.ts" -Encoding utf8

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "Next: I'll provide you a prompt for Claude Code to finish the rest" -ForegroundColor Cyan
```

---