'use client'

import { Card, Flex, Heading, Switch, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'

import { type ModConfig } from '@/lib/types'

export function GlobalTweaksSection() {
  const { control } = useFormContext<ModConfig>()

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="1">
          <Heading size="4">Global Tweaks</Heading>
          <Text color="gray" size="2">
            Toggle global game modifications
          </Text>
        </Flex>

        <Card variant="surface">
          <Flex align="center" gap="4" justify="between">
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
                Enable All Fertilities
              </Text>
              <Text color="gray" size="1">
                Every island will have all fertilities available across all
                sessions
              </Text>
            </Flex>
            <Controller
              control={control}
              name="enableAllFertilities"
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} size="3" />
              )}
            />
          </Flex>
        </Card>

        <Card variant="surface">
          <Flex align="center" gap="4" justify="between">
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
                Remove Session Transfer Time
              </Text>
              <Text color="gray" size="1">
                Ships will transfer between sessions (Old World, New World,
                etc.) instantly with no travel time
              </Text>
            </Flex>
            <Controller
              control={control}
              name="removeTransferTime"
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} size="3" />
              )}
            />
          </Flex>
        </Card>
      </Flex>
    </Card>
  )
}
