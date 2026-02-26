"use client";

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
} from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { GlobalTweaksSection } from "@/components/global-tweaks-section";
import { ModPreview } from "@/components/mod-preview";
import { ProductivitySection } from "@/components/productivity-section";
import { RadiusSection } from "@/components/radius-section";
import { generateModZip } from "@/lib/generate-zip";
import type { ModConfig, ProductivityTweak, RadiusTweak } from "@/lib/types";

export default function Home() {
	const [modName, setModName] = useState("My Custom Mod");
	const [productivityTweaks, setProductivityTweaks] = useState<
		ProductivityTweak[]
	>([]);
	const [radiusTweaks, setRadiusTweaks] = useState<RadiusTweak[]>([]);
	const [enableAllFertilities, setEnableAllFertilities] = useState(false);
	const [removeTransferTime, setRemoveTransferTime] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const config: ModConfig = useMemo(
		() => ({
			modName,
			productivityTweaks,
			radiusTweaks,
			enableAllFertilities,
			removeTransferTime,
		}),
		[
			modName,
			productivityTweaks,
			radiusTweaks,
			enableAllFertilities,
			removeTransferTime,
		],
	);

	const hasChanges =
		productivityTweaks.length > 0 ||
		radiusTweaks.length > 0 ||
		enableAllFertilities ||
		removeTransferTime;

	const handleDownload = async () => {
		if (!hasChanges) {
			return;
		}

		setIsGenerating(true);
		try {
			const blob = await generateModZip(config);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${config.modName.replace(/[^a-zA-Z0-9_-]/g, "_")}.zip`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<Box
			style={{
				minHeight: "100vh",
				background:
					"linear-gradient(to bottom, var(--color-background), var(--sand-2))",
			}}
		>
			<Container size="2" px="4">
				<Section size="3">
					<Flex direction="column" gap="2" align="center" mb="6">
						<Heading size="8" align="center">
							Anno 1800 Mod Generator
						</Heading>
						<Text size="3" color="gray" align="center">
							Configure your tweaks below, then download the mod as a ZIP. Drop
							it into your Anno 1800 mods folder and you&apos;re good to go.
						</Text>
					</Flex>

					<Flex direction="column" gap="5">
						{/* Mod Name */}
						<Flex direction="column" gap="2">
							<Text size="2" weight="medium">
								Mod Name
							</Text>
							<TextField.Root
								value={modName}
								onChange={(e) => setModName(e.target.value)}
								placeholder="Enter a name for your mod..."
								size="3"
							/>
						</Flex>

						<Separator size="4" />

						{/* Sections */}
						<ProductivitySection
							tweaks={productivityTweaks}
							onChange={setProductivityTweaks}
						/>

						<RadiusSection tweaks={radiusTweaks} onChange={setRadiusTweaks} />

						<GlobalTweaksSection
							enableAllFertilities={enableAllFertilities}
							removeTransferTime={removeTransferTime}
							onFertilitiesChange={setEnableAllFertilities}
							onTransferTimeChange={setRemoveTransferTime}
						/>

						<Separator size="4" />

						{/* Preview */}
						<ModPreview config={config} />

						{/* Download */}
						<Flex justify="center" py="4">
							<Button
								size="4"
								disabled={!hasChanges || isGenerating}
								onClick={handleDownload}
								style={{ cursor: hasChanges ? "pointer" : "not-allowed" }}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 15 15"
									fill="currentColor"
									role="img"
									aria-label="Download"
								>
									<title>Download</title>
									<path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5523 3.44772 13 4 13H11C11.5523 13 12 12.5523 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1046 12.1046 14 11 14H4C2.89543 14 2 13.1046 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" />
								</svg>
								{isGenerating ? "Generating..." : "Download Mod (.zip)"}
							</Button>
						</Flex>

						{!hasChanges && (
							<Text size="2" color="gray" align="center">
								Select at least one tweak above to generate a mod
							</Text>
						)}
					</Flex>
				</Section>
			</Container>
		</Box>
	);
}
