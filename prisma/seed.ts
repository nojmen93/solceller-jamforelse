import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Providers
  const solartech = await prisma.provider.create({
    data: {
      name: 'SolarTech AB',
      slug: 'solartech',
      logoUrl: '/logos/solartech.png',
      description: 'Sveriges ledande installatör av solceller för villaägare',
      website: 'https://solartech.se',
      phone: '+46 8 123 456',
      email: 'info@solartech.se',
      coverageRegions: ['Stockholm', 'Uppsala', 'Västerås'],
      certified: true,
      trustpilotScore: 4.6,
      avgInstallationDays: 14,
    },
  });

  const greenEnergy = await prisma.provider.create({
    data: {
      name: 'Green Energy Solutions',
      slug: 'green-energy',
      logoUrl: '/logos/green-energy.png',
      description: 'Hållbara energilösningar för framtiden',
      website: 'https://greenenergy.se',
      phone: '+46 31 234 567',
      email: 'kontakt@greenenergy.se',
      coverageRegions: ['Göteborg', 'Borås', 'Uddevalla'],
      certified: true,
      trustpilotScore: 4.8,
      avgInstallationDays: 10,
    },
  });

  const sunPower = await prisma.provider.create({
    data: {
      name: 'SunPower Nordic',
      slug: 'sunpower',
      logoUrl: '/logos/sunpower.png',
      description: 'Premiumsolceller med branschledande garanti',
      website: 'https://sunpower.se',
      phone: '+46 40 345 678',
      email: 'info@sunpower.se',
      coverageRegions: ['Malmö', 'Lund', 'Helsingborg'],
      certified: true,
      trustpilotScore: 4.5,
      avgInstallationDays: 21,
    },
  });

  console.log('Created providers');

  // Products
  await prisma.product.createMany({
    data: [
      {
        providerId: solartech.id,
        name: 'Premium Solar 6kW',
        slug: 'solartech-premium-6kw',
        panelBrand: 'Longi',
        panelWatt: 400,
        inverterBrand: 'Huawei',
        inverterModel: 'SUN2000-6KTL',
        totalKwp: 6.0,
        basePriceSek: 72000,
        installationPriceSek: 30000,
        pricePerKwpSek: 17000,
        warrantyYears: 25,
        panelEfficiency: 21.3,
        available: true,
      },
      {
        providerId: solartech.id,
        name: 'Premium Solar 8kW',
        slug: 'solartech-premium-8kw',
        panelBrand: 'Longi',
        panelWatt: 400,
        inverterBrand: 'Huawei',
        inverterModel: 'SUN2000-8KTL',
        totalKwp: 8.0,
        basePriceSek: 92000,
        installationPriceSek: 36000,
        pricePerKwpSek: 16000,
        warrantyYears: 25,
        panelEfficiency: 21.3,
        available: true,
      },
      {
        providerId: greenEnergy.id,
        name: 'Eco 5kW System',
        slug: 'green-energy-eco-5kw',
        panelBrand: 'Canadian Solar',
        panelWatt: 370,
        inverterBrand: 'SolarEdge',
        inverterModel: 'SE5000H',
        totalKwp: 5.0,
        basePriceSek: 58000,
        installationPriceSek: 32000,
        pricePerKwpSek: 18000,
        warrantyYears: 20,
        panelEfficiency: 19.8,
        available: true,
      },
      {
        providerId: greenEnergy.id,
        name: 'Eco 10kW System',
        slug: 'green-energy-eco-10kw',
        panelBrand: 'Canadian Solar',
        panelWatt: 370,
        inverterBrand: 'SolarEdge',
        inverterModel: 'SE10000H',
        totalKwp: 10.0,
        basePriceSek: 110000,
        installationPriceSek: 40000,
        pricePerKwpSek: 15000,
        warrantyYears: 20,
        panelEfficiency: 19.8,
        available: true,
      },
      {
        providerId: sunPower.id,
        name: 'Maxeon Elite 7kW',
        slug: 'sunpower-maxeon-7kw',
        panelBrand: 'SunPower Maxeon',
        panelWatt: 430,
        inverterBrand: 'Enphase',
        inverterModel: 'IQ8+',
        totalKwp: 7.0,
        basePriceSek: 95000,
        installationPriceSek: 38000,
        pricePerKwpSek: 19000,
        warrantyYears: 40,
        panelEfficiency: 22.8,
        available: true,
      },
    ],
  });

  console.log('Created products');

  // Reviews
  await prisma.review.createMany({
    data: [
      {
        providerId: solartech.id,
        userName: 'Anders Svensson',
        rating: 5,
        comment: 'Snabb installation och professionell service!',
        verified: true,
        installationDate: new Date('2025-06-15'),
        systemKwp: 6.0,
      },
      {
        providerId: greenEnergy.id,
        userName: 'Erik Johansson',
        rating: 5,
        comment: 'Fantastiskt team!',
        verified: true,
        installationDate: new Date('2025-07-10'),
        systemKwp: 5.0,
      },
    ],
  });

  console.log('Created reviews');
  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });