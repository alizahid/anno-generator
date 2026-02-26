import JSZip from "jszip";
import { generateAssetsXml } from "./generate-mod";
import type { ModConfig } from "./types";

export async function generateModZip(config: ModConfig): Promise<Blob> {
	const zip = new JSZip();

	const folderName = config.modName
		.replace(/[^a-zA-Z0-9_-]/g, "_")
		.replace(/_+/g, "_");

	const modFolder = zip.folder(folderName);
	if (!modFolder) {
		throw new Error("Failed to create mod folder in ZIP");
	}

	const dataFolder = modFolder.folder("data");
	if (!dataFolder) {
		throw new Error("Failed to create data folder in ZIP");
	}

	const configFolder = dataFolder.folder("config");
	if (!configFolder) {
		throw new Error("Failed to create config folder in ZIP");
	}

	const exportFolder = configFolder.folder("export");
	if (!exportFolder) {
		throw new Error("Failed to create export folder in ZIP");
	}

	const mainFolder = exportFolder.folder("main");
	if (!mainFolder) {
		throw new Error("Failed to create main folder in ZIP");
	}

	const assetFolder = mainFolder.folder("asset");
	if (!assetFolder) {
		throw new Error("Failed to create asset folder in ZIP");
	}

	assetFolder.file("assets.xml", generateAssetsXml(config));
	modFolder.file("modinfo.json", generateModinfoJson(config));

	return zip.generateAsync({ type: "blob" });
}

function generateModinfoJson(config: ModConfig): string {
	const features: string[] = [];
	if (config.productivityTweaks.length > 0) {
		features.push(
			`Productivity tweaks for ${config.productivityTweaks.length} building(s)`,
		);
	}
	if (config.radiusTweaks.length > 0) {
		features.push(
			`Radius tweaks for ${config.radiusTweaks.length} building(s)`,
		);
	}
	if (config.enableAllFertilities) {
		features.push("All fertilities enabled");
	}
	if (config.removeTransferTime) {
		features.push("Session transfer time removed");
	}

	const description =
		features.length > 0
			? `Custom Anno 1800 mod: ${features.join(", ")}`
			: "Custom Anno 1800 mod generated with Anno Mod Generator";

	return JSON.stringify(
		{
			Version: "1.0",
			ModID: config.modName.replace(/[^a-zA-Z0-9_-]/g, "_"),
			Category: { English: "Gameplay" },
			ModName: { English: config.modName },
			Description: { English: description },
			CreatedBy: "Anno Mod Generator",
		},
		null,
		2,
	);
}
