'use client'

import {
  Badge,
  Box,
  Card,
  Flex,
  IconButton,
  Slider,
  Text,
} from '@radix-ui/themes'
import {
  Controller,
  type FieldArrayWithId,
  useFormContext,
} from 'react-hook-form'

import { type ModConfig } from '@/lib/types'

import { RemoveIcon } from './remove-icon'

type Props = {
  field: FieldArrayWithId<ModConfig, 'productivityTweaks' | 'radiusTweaks'>
  index: number
  name: 'productivityTweaks' | 'radiusTweaks'
  onRemove: () => void
}

export function TweakCard({ field, index, name, onRemove }: Props) {
  const { control } = useFormContext<ModConfig>()

  return (
    <Card variant="surface">
      <Flex direction="column" gap="3">
        <Flex align="center" justify="between">
          <Text size="2" weight="medium">
            {field.buildingName}
          </Text>
          <IconButton
            aria-label={`Remove ${field.buildingName}`}
            color="red"
            onClick={onRemove}
            size="1"
            variant="ghost"
          >
            <RemoveIcon />
          </IconButton>
        </Flex>
        <Controller
          control={control}
          name={`${name}.${index}.multiplier`}
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
  )
}
