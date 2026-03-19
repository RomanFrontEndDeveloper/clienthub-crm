import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/store/providers';

export const metadata: Metadata = {
	title: 'ClientHub CRM',
	description: 'CRM Dashboard built with Next.js and TypeScript',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
