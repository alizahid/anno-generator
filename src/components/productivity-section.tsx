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

const productionBuildings = buildings.filter(
  (b) =>
    b.category === 'production' ||
    b.category === 'farm' ||
    b.category === 'heavy-industry',
)

export function ProductivitySection() {
  const { getValues, setValue, watch } = useFormContext<ModConfig>()
  const tweaks = watch('productivityTweaks')

  const availableBuildings = productionBuildings.filter(
    (b) => !tweaks.some((t) => t.buildingGuid === b.guid),
  )

  const addTweak = (guidStr: string) => {
    const guid = Number(guidStr)
    const building = productionBuildings.find((b) => b.guid === guid)

    if (!building) {
      return
    }

    setValue('productivityTweaks', [
      ...getValues('productivityTweaks'),
      { buildingGuid: guid, buildingName: building.name, multiplier: 2 },
    ])
  }

  const removeTweak = (guid: number) => {
    setValue(
      'productivityTweaks',
      getValues('productivityTweaks').filter((t) => t.buildingGuid !== guid),
    )
  }

  const updateMultiplier = (guid: number, multiplier: number) => {
    setValue(
      'productivityTweaks',
      getValues('productivityTweaks').map((t) =>
        t.buildingGuid === guid ? { ...t, multiplier } : t,
      ),
    )
  }

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Flex direction="column" gap="1">
            <Heading size="4">Productivity Boost</Heading>
            <Text color="gray" size="2">
              Speed up production cycle times for selected buildings
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
            <Select.Trigger placeholder="Add a building..." />
            <Select.Content>
              <Select.Group>
                <Select.Label>Farms</Select.Label>
                {availableBuildings
                  .filter((b) => b.category === 'farm')
                  .map((b) => (
                    <Select.Item key={b.guid} value={String(b.guid)}>
                      {b.name}
                    </Select.Item>
                  ))}
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Production</Select.Label>
                {availableBuildings
                  .filter((b) => b.category === 'production')
                  .map((b) => (
                    <Select.Item key={b.guid} value={String(b.guid)}>
                      {b.name}
                    </Select.Item>
                  ))}
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Heavy Industry</Select.Label>
                {availableBuildings
                  .filter((b) => b.category === 'heavy-industry')
                  .map((b) => (
                    <Select.Item key={b.guid} value={String(b.guid)}>
                      {b.name}
                    </Select.Item>
                  ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        )}

        {tweaks.length > 0 && (
          <Flex justify="end">
            <Button
              color="red"
              onClick={() => setValue('productivityTweaks', [])}
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
