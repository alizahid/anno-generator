"use client";

import {
	Box,
	Card,
	Code,
	Flex,
	Heading,
	ScrollArea,
	Text,
} from "@radix-ui/themes";
import { generateAssetsXml } from "@/lib/generate-mod";
import type { ModConfig } from "@/lib/types";

interface ModPreviewProps {
	config: ModConfig;
}

export function ModPreview({ config }: ModPreviewProps) {
	const hasContent =
		config.productivityTweaks.length > 0 ||
		config.radiusTweaks.length > 0 ||
		config.enableAllFertilities ||
		config.removeTransferTime;

	if (!hasContent) {
		return null;
	}

	const xml = generateAssetsXml(config);

	return (
		<Card size="3">
			<Flex direction="column" gap="3">
				<Heading size="4">Preview: assets.xml</Heading>
				<Text size="2" color="gray">
					This is the generated mod file that will be included in your download
				</Text>
				<Box>
					<ScrollArea scrollbars="both" style={{ maxHeight: 400 }}>
						<Code
							size="1"
							variant="ghost"
							style={{
								display: "block",
								whiteSpace: "pre",
								padding: "var(--space-3)",
							}}
						>
							{xml}
						</Code>
					</ScrollArea>
				</Box>
			</Flex>
		</Card>
	);
}
