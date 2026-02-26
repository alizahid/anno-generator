'use client'

import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
} from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { buildings } from '@/data/buildings'
import { type ModConfig } from '@/lib/types'

import { TweakCard } from './tweak-card'

const radiusBuildings = buildings.filter((b) => b.category === 'public-service')

export function RadiusSection() {
  const { control } = useFormContext<ModConfig>()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'radiusTweaks',
  })

  const availableBuildings = radiusBuildings.filter(
    (b) => !fields.some((f) => f.buildingGuid === b.guid),
  )

  const addTweak = (guidStr: string) => {
    const guid = Number(guidStr)
    const building = radiusBuildings.find((b) => b.guid === guid)

    if (!building) {
      return
    }

    append({ buildingGuid: guid, buildingName: building.name, multiplier: 2 })
  }

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Flex direction="column" gap="1">
            <Heading size="4">Service Radius</Heading>
            <Text color="gray" size="2">
              Increase the influence radius of public service buildings
            </Text>
          </Flex>
          {fields.length > 0 && (
            <Badge color="amber" size="2">
              {fields.length} building{fields.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </Flex>

        {fields.map((field, index) => (
          <TweakCard
            field={field}
            index={index}
            key={field.id}
            name="radiusTweaks"
            onRemove={() => remove(index)}
          />
        ))}

        {availableBuildings.length > 0 && (
          <Select.Root onValueChange={addTweak}>
            <Select.Trigger placeholder="Add a public service building..." />
            <Select.Content>
              {(['old-world', 'new-world', 'arctic', 'enbesa'] as const).map(
                (region, index) => {
                  const regionBuildings = availableBuildings.filter(
                    (b) => b.region === region,
                  )

                  if (regionBuildings.length === 0) {
                    return null
                  }

                  const label = {
                    arctic: 'Arctic',
                    enbesa: 'Enbesa',
                    'new-world': 'New World',
                    'old-world': 'Old World',
                  }[region]

                  return (
                    <Select.Group key={region}>
                      {index > 0 && <Select.Separator />}
                      <Select.Label>{label}</Select.Label>
                      {regionBuildings.map((b) => (
                        <Select.Item key={b.guid} value={String(b.guid)}>
                          {b.name}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  )
                },
              )}
            </Select.Content>
          </Select.Root>
        )}

        {fields.length > 0 && (
          <Flex justify="end">
            <Button
              color="red"
              onClick={() => remove()}
              size="1"
              variant="ghost"
            >
              Clear all
            </Button>
          </Flex>
        )}
      </Flex>
    </Card>
  )
}
