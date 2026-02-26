export interface Fertility {
	guid: number;
	name: string;
	region: "old-world" | "new-world" | "both";
}

export const fertilities: Fertility[] = [
	// Old World
	{ guid: 190764, name: "Potato Fertility", region: "old-world" },
	{ guid: 190767, name: "Grain Fertility", region: "old-world" },
	{ guid: 190768, name: "Red Pepper Fertility", region: "old-world" },
	{ guid: 190769, name: "Hop Fertility", region: "old-world" },
	{ guid: 190770, name: "Fur Fertility", region: "old-world" },
	{ guid: 190771, name: "Grape Fertility", region: "old-world" },

	// New World
	{ guid: 190772, name: "Sugar Cane Fertility", region: "new-world" },
	{ guid: 190773, name: "Cotton Fertility", region: "new-world" },
	{ guid: 190774, name: "Plantain Fertility", region: "new-world" },
	{ guid: 190775, name: "Caoutchouc Fertility", region: "new-world" },
	{ guid: 190776, name: "Tobacco Fertility", region: "new-world" },
	{ guid: 190777, name: "Coffee Fertility", region: "new-world" },
	{ guid: 190778, name: "Cocoa Fertility", region: "new-world" },
	{ guid: 190779, name: "Corn Fertility", region: "new-world" },
	{ guid: 190780, name: "Red Pepper Fertility (NW)", region: "new-world" },
];
