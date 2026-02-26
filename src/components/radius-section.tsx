'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Select,
  Slider,
  Text,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

import { buildings } from '@/data/buildings'
import { type ModConfig } from '@/lib/types'

import { RemoveIcon } from './remove-icon'

const radiusBuildings = buildings.filter((b) => b.category === 'public-service')

export function RadiusSection() {
  const { getValues, setValue, watch } = useFormContext<ModConfig>()
  const tweaks = watch('radiusTweaks')

  const availableBuildings = radiusBuildings.filter(
    (b) => !tweaks.some((t) => t.buildingGuid === b.guid),
  )

  const addTweak = (guidStr: string) => {
    const guid = Number(guidStr)
    const building = radiusBuildings.find((b) => b.guid === guid)

    if (!building) {
      return
    }

    setValue('radiusTweaks', [
      ...getValues('radiusTweaks'),
      { buildingGuid: guid, buildingName: building.name, multiplier: 2 },
    ])
  }

  const removeTweak = (guid: number) => {
    setValue(
      'radiusTweaks',
      getValues('radiusTweaks').filter((t) => t.buildingGuid !== guid),
    )
  }

  const updateMultiplier = (guid: number, multiplier: number) => {
    setValue(
      'radiusTweaks',
      getValues('radiusTweaks').map((t) =>
        t.buildingGuid === guid ? { ...t, multiplier } : t,
      ),
    )
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
          {tweaks.length > 0 && (
            <Badge color="amber" size="2">
              {tweaks.length} building{tweaks.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </Flex>

        {tweaks.map((tweak) => (
          <Card key={tweak.buildingGuid} variant="surface">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between">
                <Text size="2" weight="medium">
                  {tweak.buildingName}
                </Text>
                <IconButton
                  aria-label={`Remove ${tweak.buildingName}`}
                  color="red"
                  onClick={() => removeTweak(tweak.buildingGuid)}
                  size="1"
                  variant="ghost"
                >
                  <RemoveIcon />
                </IconButton>
              </Flex>
              <Flex align="center" gap="3">
                <Box flexGrow="1">
                  <Slider
                    max={10}
                    min={1}
                    onValueChange={([value]) =>
                      updateMultiplier(tweak.buildingGuid, value)
                    }
                    step={0.5}
                    value={[tweak.multiplier]}
                  />
                </Box>
                <Badge size="2" style={{ minWidth: 48 }} variant="surface">
                  {tweak.multiplier}x
                </Badge>
              </Flex>
            </Flex>
          </Card>
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

        {tweaks.length > 0 && (
          <Flex justify="end">
            <Button
              color="red"
              onClick={() => setValue('radiusTweaks', [])}
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
