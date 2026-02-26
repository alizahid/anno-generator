import { fertilities } from "@/data/fertilities";
import type { ModConfig } from "./types";

function escapeXml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function generateProductivityXml(
	tweaks: ModConfig["productivityTweaks"],
): string {
	if (tweaks.length === 0) {
		return "";
	}

	return tweaks
		.map(
			(tweak) => `
  <!-- ${escapeXml(tweak.buildingName)} - Productivity x${tweak.multiplier} -->
  <ModOp Type="merge" GUID="${tweak.buildingGuid}" Path="/Values/FactoryBase/CycleTime">
    <CycleTime>${Math.round(30 / tweak.multiplier)}</CycleTime>
  </ModOp>`,
		)
		.join("\n");
}

function generateRadiusXml(tweaks: ModConfig["radiusTweaks"]): string {
	if (tweaks.length === 0) {
		return "";
	}

	return tweaks
		.map(
			(tweak) => `
  <!-- ${escapeXml(tweak.buildingName)} - Radius x${tweak.multiplier} -->
  <ModOp Type="merge" GUID="${tweak.buildingGuid}" Path="/Values/PublicService/FullSatisfactionDistance">
    <FullSatisfactionDistance>${Math.round(30 * tweak.multiplier)}</FullSatisfactionDistance>
  </ModOp>
  <ModOp Type="merge" GUID="${tweak.buildingGuid}" Path="/Values/PublicService/NoSatisfactionDistance">
    <NoSatisfactionDistance>${Math.round(50 * tweak.multiplier)}</NoSatisfactionDistance>
  </ModOp>`,
		)
		.join("\n");
}

function generateFertilityXml(): string {
	// To enable all fertilities, we add all fertility GUIDs to every Old World
	// and New World island session template. We use the IslandFertility pool approach.
	const oldWorldFertilities = fertilities.filter(
		(f) => f.region === "old-world" || f.region === "both",
	);
	const newWorldFertilities = fertilities.filter(
		(f) => f.region === "new-world" || f.region === "both",
	);

	const fertilityItems = (items: typeof fertilities) =>
		items
			.map((f) => `          <Item><Fertility>${f.guid}</Fertility></Item>`)
			.join("\n");

	return `
  <!-- Enable All Fertilities - Old World -->
  <ModOp Type="addNextSibling" GUID="190764" Path="/Values/Fertility">
    <Fertility>
      <GrantedFertilities>
${fertilityItems(oldWorldFertilities)}
      </GrantedFertilities>
    </Fertility>
  </ModOp>

  <!-- Enable All Fertilities - Use RandomPool approach for sessions -->
  <!-- Old World Session (180023) - Replace fertility pools to include all -->
  <ModOp Type="add" GUID="180023" Path="/Values/SessionRandomManager/FertilityPool">
${oldWorldFertilities.map((f) => `    <Item><FertilityGuid>${f.guid}</FertilityGuid><Weight>100</Weight></Item>`).join("\n")}
  </ModOp>

  <!-- New World Session (180025) - Replace fertility pools to include all -->
  <ModOp Type="add" GUID="180025" Path="/Values/SessionRandomManager/FertilityPool">
${newWorldFertilities.map((f) => `    <Item><FertilityGuid>${f.guid}</FertilityGuid><Weight>100</Weight></Item>`).join("\n")}
  </ModOp>`;
}

function generateTransferTimeXml(): string {
	return `
  <!-- Remove Transfer Time between Sessions -->
  <!-- Set ship transfer time to 0 for all trade routes -->
  <ModOp Type="merge" GUID="130248" Path="/Values/WorldTransfer/TransferTime">
    <TransferTime>0</TransferTime>
  </ModOp>
  <ModOp Type="merge" GUID="130249" Path="/Values/WorldTransfer/TransferTime">
    <TransferTime>0</TransferTime>
  </ModOp>
  <ModOp Type="merge" GUID="130250" Path="/Values/WorldTransfer/TransferTime">
    <TransferTime>0</TransferTime>
  </ModOp>
  <ModOp Type="merge" GUID="130251" Path="/Values/WorldTransfer/TransferTime">
    <TransferTime>0</TransferTime>
  </ModOp>
  <ModOp Type="merge" GUID="130252" Path="/Values/WorldTransfer/TransferTime">
    <TransferTime>0</TransferTime>
  </ModOp>`;
}

export function generateAssetsXml(config: ModConfig): string {
	const sections: string[] = [];

	const productivityXml = generateProductivityXml(config.productivityTweaks);
	if (productivityXml) {
		sections.push(productivityXml);
	}

	const radiusXml = generateRadiusXml(config.radiusTweaks);
	if (radiusXml) {
		sections.push(radiusXml);
	}

	if (config.enableAllFertilities) {
		sections.push(generateFertilityXml());
	}

	if (config.removeTransferTime) {
		sections.push(generateTransferTimeXml());
	}

	return `<ModOps>
${sections.join("\n")}
</ModOps>
`;
}
