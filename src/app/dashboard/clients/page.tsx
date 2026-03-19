'use client';

import { useClients } from '@/features/clients/hooks/useClients';

export default function ClientsPage() {
	const { data, isLoading, error } = useClients();

	if (isLoading) {
		return <div>Loading clients...</div>;
	}

	if (error) {
		return <div>Something went wrong while loading clients.</div>;
	}

	return (
		<div>
			<h2 className='mb-4 text-2xl font-bold'>Clients</h2>

			<ul className='space-y-3'>
				{data?.map((client) => (
					<li
						key={client.id}
						className='rounded-lg border border-gray-200 bg-white p-4'
					>
						<div className='text-lg font-semibold'>
							{client.fullName}
						</div>
						<div className='text-sm text-gray-600'>
							{client.email}
						</div>
						<div className='text-sm text-gray-600'>
							{client.company}
						</div>
						<div className='text-sm text-gray-600'>
							{client.status}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
