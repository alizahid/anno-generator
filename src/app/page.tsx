'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'

import { GlobalTweaksSection } from '@/components/global-tweaks-section'
import { ModPreview } from '@/components/mod-preview'
import { ProductivitySection } from '@/components/productivity-section'
import { RadiusSection } from '@/components/radius-section'
import { generateModZip } from '@/lib/generate-zip'
import { type ModConfig } from '@/lib/types'

export default function Home() {
  const form = useForm<ModConfig>({
    defaultValues: {
      enableAllFertilities: false,
      modName: 'My Custom Mod',
      productivityTweaks: [],
      radiusTweaks: [],
      removeTransferTime: false,
    },
  })

  const { isDirty, isSubmitting } = form.formState

  const handleDownload = async () => {
    if (!isDirty) {
      return
    }

    const config = form.getValues()
    const blob = await generateModZip(config)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${config.modName.replace(/[^a-zA-Z0-9_-]/g, '_')}.zip`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <FormProvider {...form}>
      <Box
        style={{
          background:
            'linear-gradient(to bottom, var(--color-background), var(--sand-2))',
          minHeight: '100vh',
        }}
      >
        <Container px="4" size="2">
          <Section size="3">
            <Flex align="center" direction="column" gap="2" mb="6">
              <Heading align="center" size="8">
                Anno 1800 Mod Generator
              </Heading>
              <Text align="center" color="gray" size="3">
                Configure your tweaks below, then download the mod as a ZIP.
                Drop it into your Anno 1800 mods folder and you&apos;re good to
                go.
              </Text>
            </Flex>

            <Flex direction="column" gap="5">
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Mod Name
                </Text>
                <TextField.Root
                  placeholder="Enter a name for your mod..."
                  size="3"
                  {...form.register('modName')}
                />
              </Flex>

              <Separator size="4" />

              <ProductivitySection />
              <RadiusSection />
              <GlobalTweaksSection />

              <Separator size="4" />

              <ModPreview />

              <Flex justify="center" py="4">
                <Button
                  disabled={!isDirty || isSubmitting}
                  onClick={handleDownload}
                  size="4"
                  style={{
                    cursor: isDirty ? 'pointer' : 'not-allowed',
                  }}
                >
                  <svg
                    aria-label="Download"
                    fill="currentColor"
                    height="18"
                    role="img"
                    viewBox="0 0 15 15"
                    width="18"
                  >
                    <title>Download</title>
                    <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5523 3.44772 13 4 13H11C11.5523 13 12 12.5523 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1046 12.1046 14 11 14H4C2.89543 14 2 13.1046 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" />
                  </svg>
                  {isSubmitting ? 'Generating...' : 'Download Mod (.zip)'}
                </Button>
              </Flex>

              {!isDirty && (
                <Text align="center" color="gray" size="2">
                  Select at least one tweak above to generate a mod
                </Text>
              )}
            </Flex>
          </Section>
        </Container>
      </Box>
    </FormProvider>
  )
}
