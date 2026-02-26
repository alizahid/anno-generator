'use client'

import {
  Box,
  Card,
  Code,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'

import { generateAssetsXml } from '@/lib/generate-mod'
import { type ModConfig } from '@/lib/types'

export function ModPreview() {
  const { control } = useFormContext<ModConfig>()
  const config = useWatch({ control })

  const hasContent =
    (config.productivityTweaks?.length ?? 0) > 0 ||
    (config.radiusTweaks?.length ?? 0) > 0 ||
    config.enableAllFertilities ||
    config.removeTransferTime

  if (!hasContent) {
    return null
  }

  const xml = generateAssetsXml(config as ModConfig)

  return (
    <Card size="3">
      <Flex direction="column" gap="3">
        <Heading size="4">Preview: assets.xml</Heading>
        <Text color="gray" size="2">
          This is the generated mod file that will be included in your download
        </Text>
        <Box>
          <ScrollArea scrollbars="both" style={{ maxHeight: 400 }}>
            <Code
              size="1"
              style={{
                display: 'block',
                padding: 'var(--space-3)',
                whiteSpace: 'pre',
              }}
              variant="ghost"
            >
              {xml}
            </Code>
          </ScrollArea>
        </Box>
      </Flex>
    </Card>
  )
}
