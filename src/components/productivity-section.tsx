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
          <TweakCard
            field={field}
            index={index}
            key={field.id}
            name="productivityTweaks"
            onRemove={() => remove(index)}
          />
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
