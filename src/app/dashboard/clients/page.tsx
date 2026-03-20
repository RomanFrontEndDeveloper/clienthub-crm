'use client';

import { ClientsTable } from '@/features/clients/components/ClientsTable';
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
		<div className='space-y-6'>
			<div>
				<h2 className='text-2xl font-bold text-gray-900'>Clients</h2>
				<p className='text-sm text-gray-600'>
					Manage your client list and monitor their status.
				</p>
			</div>

			{data && <ClientsTable clients={data} />}
		</div>
	);
}

// src/features/clients/
//   types.ts
//   hooks/
//     useClients.ts
//   services/
//     clients.service.ts
//   components/
//     ClientStatusBadge.tsx
//     ClientsTable.tsx
