import { Header } from './Header';
import { Sidebar } from './Sidebar';

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className='min-h-screen bg-gray-50 text-gray-900 lg:flex'>
			<Sidebar />

			<div className='flex min-h-screen flex-1 flex-col lg:ml-0'>
				<Header />
				<main className='flex-1 p-4 sm:p-6'>{children}</main>
			</div>
		</div>
	);
}
