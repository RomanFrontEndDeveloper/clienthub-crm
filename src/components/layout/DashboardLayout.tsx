import { Header } from './Header';
import { Sidebar } from './Sidebar';

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className='flex min-h-screen bg-gray-50 text-gray-900'>
			<Sidebar />

			<div className='flex flex-1 flex-col'>
				<Header />
				<main className='flex-1 p-6'>{children}</main>
			</div>
		</div>
	);
}
