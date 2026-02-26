import JSZip from 'jszip'

import { generateAssetsXml } from './generate-mod'
import { type ModConfig } from './types'

function countActiveMultipliers(
  multipliers: Record<string, number | undefined>,
) {
  return Object.values(multipliers).filter((m) => m != null && m > 1).length
}

export async function generateModZip(config: ModConfig) {
  const zip = new JSZip()

  const folderName = config.modName
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')

  const modFolder = zip.folder(folderName)!
  const assetFolder = modFolder
    .folder('data')!
    .folder('config')!
    .folder('export')!
    .folder('main')!
    .folder('asset')!

  assetFolder.file('assets.xml', generateAssetsXml(config))
  modFolder.file('modinfo.json', generateModinfoJson(config))

  return await zip.generateAsync({ type: 'blob' })
}

function generateModinfoJson(config: ModConfig) {
  const features: Array<string> = []

  const productivityCount = countActiveMultipliers(
    config.productivityMultipliers,
  )
  if (productivityCount > 0) {
    features.push(`Productivity tweaks for ${productivityCount} building(s)`)
  }

  const radiusCount = countActiveMultipliers(config.radiusMultipliers)
  if (radiusCount > 0) {
    features.push(`Radius tweaks for ${radiusCount} building(s)`)
  }

  if (config.enableAllFertilities) {
    features.push('All fertilities enabled')
  }
  if (config.removeTransferTime) {
    features.push('Session transfer time removed')
  }

  const description =
    features.length > 0
      ? `Custom Anno 1800 mod: ${features.join(', ')}`
      : 'Custom Anno 1800 mod generated with Anno Mod Generator'

  return JSON.stringify(
    {
      Category: { English: 'Gameplay' },
      CreatedBy: 'Anno Mod Generator',
      Description: { English: description },
      ModID: config.modName.replace(/[^a-zA-Z0-9_-]/g, '_'),
      ModName: { English: config.modName },
      Version: '1.0',
    },
    null,
    2,
  )
}
