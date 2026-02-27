'use client'

import { buildings } from '@/data/buildings'

import { BuildingTable } from './building-table'

const serviceBuildings = buildings.filter(
  (b) => b.category === 'public-service',
)

export function RadiusSection() {
  return (
    <BuildingTable
      buildings={serviceBuildings}
      description="Set multipliers to increase influence radius of public service buildings"
      fieldName="radiusMultipliers"
      title="Service Radius"
    />
  )
}
