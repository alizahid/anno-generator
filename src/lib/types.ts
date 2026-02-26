import { z } from 'zod'

// ── Shared enums and types ───────────────────────────────────────────

export type Region = 'arctic' | 'enbesa' | 'new-world' | 'old-world'

export const regions: Record<Region, string> = {
  arctic: 'Arctic',
  enbesa: 'Enbesa',
  'new-world': 'New World',
  'old-world': 'Old World',
}

export type PopulationTier =
  | 'Artisans'
  | 'Elders'
  | 'Engineers'
  | 'Explorers'
  | 'Farmers'
  | 'Investors'
  | 'Jornaleros'
  | 'Obreros'
  | 'Scholars'
  | 'Shepherds'
  | 'Technicians'
  | 'Workers'

export type BuildingCategory =
  | 'farm'
  | 'heavy-industry'
  | 'production'
  | 'public-service'

export const buildingCategories: Record<BuildingCategory, string> = {
  farm: 'Farm',
  'heavy-industry': 'Heavy Industry',
  production: 'Production',
  'public-service': 'Public Service',
}

// ── Building data ────────────────────────────────────────────────────

export type Building = {
  category: BuildingCategory
  guid: number
  icon: string
  name: string
  region: Region
  tier: PopulationTier
}

export const tierIcons: Record<PopulationTier, string> = {
  Artisans: '/tiers/artisans.png',
  Elders: '/tiers/elders.png',
  Engineers: '/tiers/engineers.png',
  Explorers: '/tiers/explorers.png',
  Farmers: '/tiers/farmers.png',
  Investors: '/tiers/investors.png',
  Jornaleros: '/tiers/jornaleros.png',
  Obreros: '/tiers/obreros.png',
  Scholars: '/tiers/scholars.png',
  Shepherds: '/tiers/shepherds.png',
  Technicians: '/tiers/technicians.png',
  Workers: '/tiers/workers.png',
}

// ── Fertility data ───────────────────────────────────────────────────

export type Fertility = {
  guid: number
  name: string
  region: Region
}

// ── Mod config (form state) ──────────────────────────────────────────

export const modConfigSchema = z.object({
  enableAllFertilities: z.boolean(),
  modName: z.string().min(1),
  productivityMultipliers: z.record(z.string(), z.number().optional()),
  radiusMultipliers: z.record(z.string(), z.number().optional()),
  removeTransferTime: z.boolean(),
})

export type ModConfig = z.infer<typeof modConfigSchema>
