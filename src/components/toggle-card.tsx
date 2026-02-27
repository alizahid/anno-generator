'use client'

import { Card, Flex, Switch, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'

import { type ModConfig } from '@/lib/types'

type Props = {
  description: string
  name: 'enableAllFertilities' | 'removeTransferTime'
  title: string
}

export function ToggleCard({ description, name, title }: Props) {
  const { control } = useFormContext<ModConfig>()

  return (
    <Card variant="surface">
      <Flex align="center" gap="4" justify="between">
        <Flex direction="column" gap="1">
          <Text size="2" weight="medium">
            {title}
          </Text>
          <Text color="gray" size="1">
            {description}
          </Text>
        </Flex>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onCheckedChange={onChange} size="3" />
          )}
        />
      </Flex>
    </Card>
  )
}
