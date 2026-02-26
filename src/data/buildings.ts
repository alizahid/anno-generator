export interface Building {
	guid: number;
	name: string;
	category: BuildingCategory;
	region: Region;
	tier?: string;
}

export type BuildingCategory =
	| "production"
	| "public-service"
	| "farm"
	| "heavy-industry"
	| "military";

export type Region = "old-world" | "new-world" | "arctic" | "enbesa" | "all";

// GUIDs sourced from Incipium's Anno 1800 Modding Reference
// https://incipium.github.io/Anno1800Modding/guid.html

// ── Old World Farms ──────────────────────────────────────────────────

const oldWorldFarms: Building[] = [
	{
		guid: 1010265,
		name: "Potato Farm",
		category: "farm",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010262,
		name: "Grain Farm",
		category: "farm",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010267,
		name: "Sheep Farm",
		category: "farm",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010264,
		name: "Hop Farm",
		category: "farm",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 100654,
		name: "Red Pepper Farm",
		category: "farm",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010269,
		name: "Pig Farm",
		category: "farm",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010263,
		name: "Cattle Farm",
		category: "farm",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 100655,
		name: "Vineyard",
		category: "farm",
		region: "old-world",
		tier: "Engineers",
	},
];

// ── Old World Production ─────────────────────────────────────────────

const oldWorldProduction: Building[] = [
	{
		guid: 1010266,
		name: "Lumberjack's Hut",
		category: "production",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 100451,
		name: "Sawmill",
		category: "production",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010558,
		name: "Hunting Cabin",
		category: "production",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010294,
		name: "Schnapps Distillery",
		category: "production",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010313,
		name: "Flour Mill",
		category: "production",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010291,
		name: "Bakery",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010315,
		name: "Framework Knitters",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010292,
		name: "Brewery",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010312,
		name: "Rendering Works",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010281,
		name: "Soap Factory",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010316,
		name: "Slaughterhouse",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010295,
		name: "Cannery",
		category: "production",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010284,
		name: "Sewing Machine Factory",
		category: "production",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010325,
		name: "Fur Dealer",
		category: "production",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 101250,
		name: "Spectacle Factory",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010323,
		name: "Bicycle Factory",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 100659,
		name: "Champagne Cellar",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010326,
		name: "Gramophone Factory",
		category: "production",
		region: "old-world",
		tier: "Investors",
	},
	{
		guid: 1010324,
		name: "Clockmakers",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010286,
		name: "Light Bulb Factory",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010328,
		name: "Jewellers",
		category: "production",
		region: "old-world",
		tier: "Investors",
	},
	{
		guid: 1010285,
		name: "Window Factory",
		category: "production",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010283,
		name: "Brick Factory",
		category: "production",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010280,
		name: "Concrete Factory",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010293,
		name: "Artisanal Kitchen",
		category: "production",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010300,
		name: "Dynamite Factory",
		category: "production",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010303,
		name: "Cab Assembly Line",
		category: "production",
		region: "old-world",
		tier: "Investors",
	},
];

// ── Old World Heavy Industry ─────────────────────────────────────────

const oldWorldHeavyIndustry: Building[] = [
	{
		guid: 1010298,
		name: "Charcoal Kiln",
		category: "heavy-industry",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010305,
		name: "Iron Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010304,
		name: "Coal Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010297,
		name: "Furnace",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010296,
		name: "Steelworks",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010299,
		name: "Weapons Factory",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010288,
		name: "Sailmakers",
		category: "heavy-industry",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 100416,
		name: "Clay Pit",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010307,
		name: "Zinc Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010308,
		name: "Copper Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010311,
		name: "Gold Ore Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010560,
		name: "Sand Mine",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010319,
		name: "Glassmakers",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010309,
		name: "Limestone Quarry",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010310,
		name: "Saltpeter Works",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010282,
		name: "Brass Smeltery",
		category: "heavy-industry",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010321,
		name: "Filament Factory",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010327,
		name: "Goldsmiths",
		category: "heavy-industry",
		region: "old-world",
		tier: "Investors",
	},
	{
		guid: 1010314,
		name: "Malthouse",
		category: "heavy-industry",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010318,
		name: "Cotton Mill",
		category: "heavy-industry",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010317,
		name: "Sugar Refinery",
		category: "heavy-industry",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010302,
		name: "Motor Assembly Line",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010301,
		name: "Heavy Weapons Factory",
		category: "heavy-industry",
		region: "old-world",
		tier: "Engineers",
	},
];

// ── New World Farms ──────────────────────────────────────────────────

const newWorldFarms: Building[] = [
	{
		guid: 1010329,
		name: "Sugar Cane Plantation",
		category: "farm",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 1010331,
		name: "Cotton Plantation",
		category: "farm",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 101263,
		name: "Plantain Plantation",
		category: "farm",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 1010333,
		name: "Caoutchouc Plantation",
		category: "farm",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 1010330,
		name: "Tobacco Plantation",
		category: "farm",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 101251,
		name: "Coffee Plantation",
		category: "farm",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 1010332,
		name: "Cocoa Plantation",
		category: "farm",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 101270,
		name: "Corn Farm",
		category: "farm",
		region: "new-world",
		tier: "Jornaleros",
	},
];

// ── New World Production ─────────────────────────────────────────────

const newWorldProduction: Building[] = [
	{
		guid: 1010340,
		name: "Rum Distillery",
		category: "production",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 101264,
		name: "Fried Plantain Kitchen",
		category: "production",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 101266,
		name: "Poncho Darner",
		category: "production",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 101271,
		name: "Tortilla Maker",
		category: "production",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 101252,
		name: "Coffee Roaster",
		category: "production",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 101273,
		name: "Bombín Weaver",
		category: "production",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 1010342,
		name: "Cigar Factory",
		category: "production",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 1010341,
		name: "Chocolate Factory",
		category: "production",
		region: "new-world",
		tier: "Obreros",
	},
];

// ── Public Services ──────────────────────────────────────────────────

const publicServices: Building[] = [
	{
		guid: 1010372,
		name: "Marketplace",
		category: "public-service",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010358,
		name: "Pub",
		category: "public-service",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010359,
		name: "Church",
		category: "public-service",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010360,
		name: "School",
		category: "public-service",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010463,
		name: "Fire Department",
		category: "public-service",
		region: "old-world",
		tier: "Farmers",
	},
	{
		guid: 1010462,
		name: "Police Station",
		category: "public-service",
		region: "old-world",
		tier: "Workers",
	},
	{
		guid: 1010464,
		name: "Hospital",
		category: "public-service",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010361,
		name: "Variety Theatre",
		category: "public-service",
		region: "old-world",
		tier: "Artisans",
	},
	{
		guid: 1010362,
		name: "University",
		category: "public-service",
		region: "old-world",
		tier: "Engineers",
	},
	{
		guid: 1010365,
		name: "Bank",
		category: "public-service",
		region: "old-world",
		tier: "Investors",
	},
	{
		guid: 1010364,
		name: "Members Club",
		category: "public-service",
		region: "old-world",
		tier: "Investors",
	},
	{
		guid: 101258,
		name: "Chapel",
		category: "public-service",
		region: "new-world",
		tier: "Jornaleros",
	},
	{
		guid: 101259,
		name: "Boxing Arena",
		category: "public-service",
		region: "new-world",
		tier: "Obreros",
	},
	{
		guid: 101257,
		name: "New World Marketplace",
		category: "public-service",
		region: "new-world",
		tier: "Jornaleros",
	},
];

// ── All Buildings ────────────────────────────────────────────────────

export const buildings: Building[] = [
	...oldWorldFarms,
	...oldWorldProduction,
	...oldWorldHeavyIndustry,
	...newWorldFarms,
	...newWorldProduction,
	...publicServices,
];

export const buildingCategories: Record<BuildingCategory, string> = {
	production: "Production",
	"public-service": "Public Service",
	farm: "Farm",
	"heavy-industry": "Heavy Industry",
	military: "Military & Harbour",
};

export const regions: Record<Region, string> = {
	"old-world": "Old World",
	"new-world": "New World",
	arctic: "Arctic",
	enbesa: "Enbesa",
	all: "All Regions",
};
