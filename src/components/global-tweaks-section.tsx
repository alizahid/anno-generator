'use client'

import { Card, Flex, Heading, Text } from '@radix-ui/themes'

import { ToggleCard } from './toggle-card'

export function GlobalTweaksSection() {
  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="1">
          <Heading size="4">Global Tweaks</Heading>
          <Text color="gray" size="2">
            Toggle global game modifications
          </Text>
        </Flex>

        <ToggleCard
          description="Every island will have all fertilities available across all sessions"
          name="enableAllFertilities"
          title="Enable All Fertilities"
        />

        <ToggleCard
          description="Ships will transfer between sessions (Old World, New World, etc.) instantly with no travel time"
          name="removeTransferTime"
          title="Remove Session Transfer Time"
        />
      </Flex>
    </Card>
  )
}
