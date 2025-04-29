export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="container my-6 px-6">
			{children}
		</div>
	);
}
