'use client'

import { buildings } from '@/data/buildings'

import { BuildingTable } from './building-table'

const productionBuildings = buildings.filter(
  (b) => b.category !== 'public-service',
)

export function ProductivitySection() {
  return (
    <BuildingTable
      buildings={productionBuildings}
      description="Set multipliers to boost production cycle times"
      fieldName="productivityMultipliers"
      title="Productivity Boost"
    />
  )
}
