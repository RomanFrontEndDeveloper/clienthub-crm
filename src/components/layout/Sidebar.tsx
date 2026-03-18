import Link from 'next/link';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/dashboard/clients', label: 'Clients' },
	{ href: '/dashboard/deals', label: 'Deals' },
	{ href: '/dashboard/tasks', label: 'Tasks' },
	{ href: '/dashboard/users', label: 'Users' },
	{ href: '/dashboard/analytics', label: 'Analytics' },
];

export function Sidebar() {
	return (
		<aside className='w-64 border-r border-gray-200 bg-white p-4'>
			<div className='mb-8 text-2xl font-bold'>ClientHub</div>

			<nav>
				<ul className='space-y-2'>
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
