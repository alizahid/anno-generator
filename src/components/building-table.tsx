'use client'

import {
  Button,
  Card,
  Flex,
  Heading,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  type Building,
  type ModConfig,
  type PopulationTier,
  type Region,
  regions,
  tierIcons,
} from '@/lib/types'

const regionOrder: Array<Region> = [
  'old-world',
  'new-world',
  'arctic',
  'enbesa',
]

const tierOrder: Array<PopulationTier> = [
  'Farmers',
  'Workers',
  'Artisans',
  'Engineers',
  'Investors',
  'Jornaleros',
  'Obreros',
  'Explorers',
  'Technicians',
  'Shepherds',
  'Elders',
  'Scholars',
]

type Props = {
  buildings: Array<Building>
  description: string
  fieldName: 'productivityMultipliers' | 'radiusMultipliers'
  title: string
}

export function BuildingTable({
  buildings,
  description,
  fieldName,
  title,
}: Props) {
  const { control, setValue } = useFormContext<ModConfig>()
  const [applyValue, setApplyValue] = useState('2')

  const applyToAll = () => {
    const multiplier = Number(applyValue)

    if (Number.isNaN(multiplier) || multiplier < 1) {
      return
    }

    const record: Record<string, number> = {}

    for (const building of buildings) {
      record[String(building.guid)] = multiplier
    }

    setValue(fieldName, record, { shouldDirty: true })
  }

  const clearAll = () => {
    setValue(fieldName, {}, { shouldDirty: true })
  }

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="1">
          <Heading size="4">{title}</Heading>
          <Text color="gray" size="2">
            {description}
          </Text>
        </Flex>

        <Flex align="center" gap="2">
          <TextField.Root
            max="10"
            min="1"
            onChange={(event) => setApplyValue(event.target.value)}
            placeholder="2"
            size="2"
            step="0.5"
            style={{ width: 64 }}
            type="number"
            value={applyValue}
          />
          <Button onClick={applyToAll} size="2" variant="soft">
            Apply to all
          </Button>
          <Button color="red" onClick={clearAll} size="2" variant="ghost">
            Clear all
          </Button>
        </Flex>

        {regionOrder.map((region) => {
          const regionBuildings = buildings.filter((b) => b.region === region)

          if (regionBuildings.length === 0) {
            return null
          }

          const tiers = tierOrder.filter((tier) =>
            regionBuildings.some((b) => b.tier === tier),
          )

          return (
            <Flex direction="column" gap="3" key={region}>
              <Text color="gray" size="2" weight="bold">
                {regions[region]}
              </Text>

              {tiers.map((tier) => {
                const tierBuildings = regionBuildings.filter(
                  (b) => b.tier === tier,
                )

                if (tierBuildings.length === 0) {
                  return null
                }

                return (
                  <Flex direction="column" gap="1" key={`${region}-${tier}`}>
                    <Flex align="center" gap="1">
                      <Image
                        alt={tier}
                        height={18}
                        src={tierIcons[tier]}
                        width={18}
                      />
                      <Text color="gray" size="1" weight="medium">
                        {tier}
                      </Text>
                    </Flex>

                    <Table.Root size="1" variant="surface">
                      <Table.Body>
                        {tierBuildings.map((building) => (
                          <Table.Row key={building.guid}>
                            <Table.RowHeaderCell>
                              <Flex align="center" gap="2">
                                <Image
                                  alt={building.name}
                                  height={20}
                                  src={building.icon}
                                  style={{ flexShrink: 0 }}
                                  width={20}
                                />
                                <Text size="2">{building.name}</Text>
                              </Flex>
                            </Table.RowHeaderCell>
                            <Table.Cell align="right" width="80px">
                              <Controller
                                control={control}
                                name={`${fieldName}.${building.guid}`}
                                render={({ field: { onChange, value } }) => (
                                  <TextField.Root
                                    max="10"
                                    min="1"
                                    onChange={(event) => {
                                      const v = event.target.value
                                      onChange(v === '' ? undefined : Number(v))
                                    }}
                                    placeholder="—"
                                    size="1"
                                    step="0.5"
                                    style={{ width: 64 }}
                                    type="number"
                                    value={value ?? ''}
                                  />
                                )}
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    </Card>
  )
}
