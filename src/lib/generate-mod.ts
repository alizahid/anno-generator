import { create } from 'xmlbuilder2'

import { buildings } from '@/data/buildings'
import { fertilities } from '@/data/fertilities'

import { type ModConfig } from './types'

type XmlNode = ReturnType<typeof create>

function getActiveMultipliers(multipliers: Record<string, number | undefined>) {
  return Object.entries(multipliers)
    .filter(([, m]) => m != null && m > 1)
    .map(([guid, multiplier]) => ({
      guid,
      multiplier: multiplier!,
      name:
        buildings.find((b) => b.guid === Number(guid))?.name ??
        `Building ${guid}`,
    }))
}

function addProductivityOps(
  root: XmlNode,
  multipliers: ModConfig['productivityMultipliers'],
) {
  for (const { guid, multiplier, name } of getActiveMultipliers(multipliers)) {
    root
      .com(` ${name} - Productivity x${multiplier} `)
      .ele('ModOp', {
        GUID: guid,
        Path: '/Values/FactoryBase/CycleTime',
        Type: 'merge',
      })
      .ele('CycleTime')
      .txt(String(Math.round(30 / multiplier)))
  }
}

function addRadiusOps(
  root: XmlNode,
  multipliers: ModConfig['radiusMultipliers'],
) {
  for (const { guid, multiplier, name } of getActiveMultipliers(multipliers)) {
    root.com(` ${name} - Radius x${multiplier} `)

    root
      .ele('ModOp', {
        GUID: guid,
        Path: '/Values/PublicService/FullSatisfactionDistance',
        Type: 'merge',
      })
      .ele('FullSatisfactionDistance')
      .txt(String(Math.round(30 * multiplier)))

    root
      .ele('ModOp', {
        GUID: guid,
        Path: '/Values/PublicService/NoSatisfactionDistance',
        Type: 'merge',
      })
      .ele('NoSatisfactionDistance')
      .txt(String(Math.round(50 * multiplier)))
  }
}

function addFertilityOps(root: XmlNode) {
  const oldWorldFertilities = fertilities.filter(
    (f) => f.region === 'old-world',
  )
  const newWorldFertilities = fertilities.filter(
    (f) => f.region === 'new-world',
  )
  const enbesaFertilities = fertilities.filter((f) => f.region === 'enbesa')

  const addFertilityPool = (
    sessionGuid: string,
    sessionName: string,
    items: typeof fertilities,
  ) => {
    root.com(` Enable All Fertilities - ${sessionName} `)

    const modOp = root.ele('ModOp', {
      GUID: sessionGuid,
      Path: '/Values/SessionRandomManager/FertilityPool',
      Type: 'add',
    })

    for (const f of items) {
      const item = modOp.ele('Item')
      item.ele('FertilityGuid').txt(String(f.guid))
      item.ele('Weight').txt('100')
    }
  }

  addFertilityPool('180023', 'Old World', oldWorldFertilities)
  addFertilityPool('180025', 'New World', newWorldFertilities)
  addFertilityPool('180045', 'Enbesa', enbesaFertilities)
}

function addTransferTimeOps(root: XmlNode) {
  root.com(' Remove Transfer Time between Sessions ')

  const transferGuids = ['130248', '130249', '130250', '130251', '130252']

  for (const guid of transferGuids) {
    root
      .ele('ModOp', {
        GUID: guid,
        Path: '/Values/WorldTransfer/TransferTime',
        Type: 'merge',
      })
      .ele('TransferTime')
      .txt('0')
  }
}

export function generateAssetsXml(config: ModConfig) {
  const doc = create({ encoding: 'UTF-8', version: '1.0' })
  const root = doc.ele('ModOps')

  const hasProductivity =
    getActiveMultipliers(config.productivityMultipliers).length > 0
  const hasRadius = getActiveMultipliers(config.radiusMultipliers).length > 0

  if (hasProductivity) {
    addProductivityOps(root, config.productivityMultipliers)
  }

  if (hasRadius) {
    addRadiusOps(root, config.radiusMultipliers)
  }

  if (config.enableAllFertilities) {
    addFertilityOps(root)
  }

  if (config.removeTransferTime) {
    addTransferTimeOps(root)
  }

  return doc.end({ indent: '  ', prettyPrint: true })
}
