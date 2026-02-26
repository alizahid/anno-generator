"use client";

import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Heading,
	IconButton,
	Select,
	Slider,
	Text,
} from "@radix-ui/themes";
import { buildings } from "@/data/buildings";
import type { RadiusTweak } from "@/lib/types";

interface RadiusSectionProps {
	tweaks: RadiusTweak[];
	onChange: (tweaks: RadiusTweak[]) => void;
}

const radiusBuildings = buildings.filter(
	(b) => b.category === "public-service",
);

export function RadiusSection({ tweaks, onChange }: RadiusSectionProps) {
	const availableBuildings = radiusBuildings.filter(
		(b) => !tweaks.some((t) => t.buildingGuid === b.guid),
	);

	const addTweak = (guidStr: string) => {
		const guid = Number(guidStr);
		const building = radiusBuildings.find((b) => b.guid === guid);
		if (!building) {
			return;
		}
		onChange([
			...tweaks,
			{ buildingGuid: guid, buildingName: building.name, multiplier: 2 },
		]);
	};

	const removeTweak = (guid: number) => {
		onChange(tweaks.filter((t) => t.buildingGuid !== guid));
	};

	const updateMultiplier = (guid: number, multiplier: number) => {
		onChange(
			tweaks.map((t) => (t.buildingGuid === guid ? { ...t, multiplier } : t)),
		);
	};

	return (
		<Card size="3">
			<Flex direction="column" gap="4">
				<Flex align="center" justify="between">
					<Flex direction="column" gap="1">
						<Heading size="4">Service Radius</Heading>
						<Text size="2" color="gray">
							Increase the influence radius of public service buildings
						</Text>
					</Flex>
					{tweaks.length > 0 && (
						<Badge color="amber" size="2">
							{tweaks.length} building{tweaks.length !== 1 ? "s" : ""}
						</Badge>
					)}
				</Flex>

				{tweaks.map((tweak) => (
					<Card key={tweak.buildingGuid} variant="surface">
						<Flex direction="column" gap="3">
							<Flex align="center" justify="between">
								<Text weight="medium" size="2">
									{tweak.buildingName}
								</Text>
								<IconButton
									size="1"
									variant="ghost"
									color="red"
									onClick={() => removeTweak(tweak.buildingGuid)}
									aria-label={`Remove ${tweak.buildingName}`}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 15 15"
										fill="currentColor"
										aria-hidden="true"
									>
										<title>Remove</title>
										<path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
									</svg>
								</IconButton>
							</Flex>
							<Flex align="center" gap="3">
								<Box flexGrow="1">
									<Slider
										min={1}
										max={10}
										step={0.5}
										value={[tweak.multiplier]}
										onValueChange={([value]) =>
											updateMultiplier(tweak.buildingGuid, value)
										}
									/>
								</Box>
								<Badge variant="surface" size="2" style={{ minWidth: 48 }}>
									{tweak.multiplier}x
								</Badge>
							</Flex>
						</Flex>
					</Card>
				))}

				{availableBuildings.length > 0 && (
					<Flex gap="2" align="center">
						<Box flexGrow="1">
							<Select.Root onValueChange={addTweak}>
								<Select.Trigger placeholder="Add a public service building..." />
								<Select.Content>
									<Select.Group>
										<Select.Label>Old World</Select.Label>
										{availableBuildings
											.filter((b) => b.region === "old-world")
											.map((b) => (
												<Select.Item key={b.guid} value={String(b.guid)}>
													{b.name}
												</Select.Item>
											))}
									</Select.Group>
									<Select.Separator />
									<Select.Group>
										<Select.Label>New World</Select.Label>
										{availableBuildings
											.filter((b) => b.region === "new-world")
											.map((b) => (
												<Select.Item key={b.guid} value={String(b.guid)}>
													{b.name}
												</Select.Item>
											))}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</Box>
					</Flex>
				)}

				{tweaks.length > 0 && (
					<Flex justify="end">
						<Button
							variant="ghost"
							color="red"
							size="1"
							onClick={() => onChange([])}
						>
							Clear all
						</Button>
					</Flex>
				)}
			</Flex>
		</Card>
	);
}
