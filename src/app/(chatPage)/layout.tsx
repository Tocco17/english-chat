export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-screen mx-6 py-6">
			{children}
		</div>
	);
}
