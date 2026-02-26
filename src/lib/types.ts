// ── Shared enums and types ───────────────────────────────────────────

export type Region = 'old-world' | 'new-world' | 'arctic' | 'enbesa'

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
  name: string
  region: Region
  tier: PopulationTier
}

// ── Fertility data ───────────────────────────────────────────────────

export type Fertility = {
  guid: number
  name: string
  region: Region
}

// ── Mod config (form state) ──────────────────────────────────────────

export type ProductivityTweak = {
  buildingGuid: number
  buildingName: string
  multiplier: number
}

export type RadiusTweak = {
  buildingGuid: number
  buildingName: string
  multiplier: number
}

export type ModConfig = {
  enableAllFertilities: boolean
  modName: string
  productivityTweaks: Array<ProductivityTweak>
  radiusTweaks: Array<RadiusTweak>
  removeTransferTime: boolean
}
