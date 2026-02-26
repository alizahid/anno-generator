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
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

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
  const { control } = useFormContext<ModConfig>()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'productivityTweaks',
  })

  const availableBuildings = productionBuildings.filter(
    (b) => !fields.some((f) => f.buildingGuid === b.guid),
  )

  const addTweak = (guidStr: string) => {
    const guid = Number(guidStr)
    const building = productionBuildings.find((b) => b.guid === guid)

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
            <Heading size="4">Productivity Boost</Heading>
            <Text color="gray" size="2">
              Speed up production cycle times for selected buildings
            </Text>
          </Flex>
          {fields.length > 0 && (
            <Badge color="amber" size="2">
              {fields.length} building{fields.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </Flex>

        {fields.map((field, index) => (
          <Card key={field.id} variant="surface">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between">
                <Text size="2" weight="medium">
                  {field.buildingName}
                </Text>
                <IconButton
                  aria-label={`Remove ${field.buildingName}`}
                  color="red"
                  onClick={() => remove(index)}
                  size="1"
                  variant="ghost"
                >
                  <RemoveIcon />
                </IconButton>
              </Flex>
              <Controller
                control={control}
                name={`productivityTweaks.${index}.multiplier`}
                render={({ field: { onChange, value } }) => (
                  <Flex align="center" gap="3">
                    <Box flexGrow="1">
                      <Slider
                        max={10}
                        min={1}
                        onValueChange={([next]) => onChange(next)}
                        step={0.5}
                        value={[value]}
                      />
                    </Box>
                    <Badge size="2" style={{ minWidth: 48 }} variant="surface">
                      {value}x
                    </Badge>
                  </Flex>
                )}
              />
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
