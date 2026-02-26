import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Anno 1800 Mod Generator",
	description:
		"Generate custom Anno 1800 mods to tweak productivity, building radius, fertilities, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Theme
					accentColor="amber"
					grayColor="sand"
					appearance="dark"
					radius="medium"
					scaling="100%"
				>
					{children}
				</Theme>
			</body>
		</html>
	);
}
