export interface ProductivityTweak {
	buildingGuid: number;
	buildingName: string;
	multiplier: number; // e.g. 2 = 200% productivity
}

export interface RadiusTweak {
	buildingGuid: number;
	buildingName: string;
	multiplier: number; // e.g. 2 = double radius
}

export interface ModConfig {
	modName: string;
	productivityTweaks: ProductivityTweak[];
	radiusTweaks: RadiusTweak[];
	enableAllFertilities: boolean;
	removeTransferTime: boolean;
}
