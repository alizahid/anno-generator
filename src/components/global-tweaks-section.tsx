"use client";

import { Card, Flex, Heading, Switch, Text } from "@radix-ui/themes";

interface GlobalTweaksSectionProps {
	enableAllFertilities: boolean;
	removeTransferTime: boolean;
	onFertilitiesChange: (enabled: boolean) => void;
	onTransferTimeChange: (enabled: boolean) => void;
}

export function GlobalTweaksSection({
	enableAllFertilities,
	removeTransferTime,
	onFertilitiesChange,
	onTransferTimeChange,
}: GlobalTweaksSectionProps) {
	return (
		<Card size="3">
			<Flex direction="column" gap="4">
				<Flex direction="column" gap="1">
					<Heading size="4">Global Tweaks</Heading>
					<Text size="2" color="gray">
						Toggle global game modifications
					</Text>
				</Flex>

				<Card variant="surface">
					<Flex align="center" justify="between" gap="4">
						<Flex direction="column" gap="1">
							<Text weight="medium" size="2">
								Enable All Fertilities
							</Text>
							<Text size="1" color="gray">
								Every island will have all fertilities available, both in the
								Old World and New World
							</Text>
						</Flex>
						<Switch
							checked={enableAllFertilities}
							onCheckedChange={onFertilitiesChange}
							size="3"
						/>
					</Flex>
				</Card>

				<Card variant="surface">
					<Flex align="center" justify="between" gap="4">
						<Flex direction="column" gap="1">
							<Text weight="medium" size="2">
								Remove Session Transfer Time
							</Text>
							<Text size="1" color="gray">
								Ships will transfer between sessions (Old World, New World,
								etc.) instantly with no travel time
							</Text>
						</Flex>
						<Switch
							checked={removeTransferTime}
							onCheckedChange={onTransferTimeChange}
							size="3"
						/>
					</Flex>
				</Card>
			</Flex>
		</Card>
	);
}
