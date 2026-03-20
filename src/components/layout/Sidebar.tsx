'use client';

import Link from 'next/link';
import { closeSidebar } from '@/store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/dashboard/clients', label: 'Clients' },
	{ href: '/dashboard/deals', label: 'Deals' },
	{ href: '/dashboard/tasks', label: 'Tasks' },
	{ href: '/dashboard/users', label: 'Users' },
	{ href: '/dashboard/analytics', label: 'Analytics' },
];

export function Sidebar() {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

	return (
		<>
			{isSidebarOpen && (
				<button
					type='button'
					aria-label='Close sidebar overlay'
					className='fixed inset-0 z-40 bg-black/40 lg:hidden'
					onClick={() => dispatch(closeSidebar())}
				/>
			)}

			<aside
				className={`
					fixed left-0 top-0 z-50 h-full w-64 transform border-r border-gray-200 bg-white p-4 transition-transform duration-300
					${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
					lg:static lg:z-auto lg:translate-x-0
				`}
			>
				<div className='mb-8 flex items-center justify-between'>
					<div className='text-2xl font-bold'>ClientHub</div>

					<button
						type='button'
						className='text-sm text-gray-500 lg:hidden'
						onClick={() => dispatch(closeSidebar())}
					>
						Close
					</button>
				</div>

				<nav>
					<ul className='space-y-2'>
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
									onClick={() => dispatch(closeSidebar())}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</>
	);
}
