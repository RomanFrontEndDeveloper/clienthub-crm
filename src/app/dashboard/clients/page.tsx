'use client';

import { useEffect, useMemo, useState } from 'react';
import { ClientsFilters } from '@/features/clients/components/ClientsFilters';
import { ClientsPagination } from '@/features/clients/components/ClientsPagination';
import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { useClients } from '@/features/clients/hooks/useClients';
import { ClientStatus, ClientsSortOption } from '@/features/clients/types';

const CLIENTS_PER_PAGE = 5;

export default function ClientsPage() {
	const { data, isLoading, error } = useClients();

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | ClientStatus>(
		'all',
	);
	const [sortOption, setSortOption] = useState<ClientsSortOption>('name-asc');
	const [currentPage, setCurrentPage] = useState(1);

	const filteredClients = useMemo(() => {
		if (!data) return [];

		const normalizedSearchTerm = searchTerm.toLowerCase();

		const filtered = data.filter((client) => {
			const matchesSearch =
				client.fullName.toLowerCase().includes(normalizedSearchTerm) ||
				client.email.toLowerCase().includes(normalizedSearchTerm) ||
				client.company.toLowerCase().includes(normalizedSearchTerm);

			const matchesStatus =
				selectedStatus === 'all' || client.status === selectedStatus;

			return matchesSearch && matchesStatus;
		});

		const sorted = [...filtered].sort((a, b) => {
			switch (sortOption) {
				case 'name-asc':
					return a.fullName.localeCompare(b.fullName);

				case 'name-desc':
					return b.fullName.localeCompare(a.fullName);

				case 'date-desc':
					return (
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
					);

				case 'date-asc':
					return (
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime()
					);

				default:
					return 0;
			}
		});

		return sorted;
	}, [data, searchTerm, selectedStatus, sortOption]);

	const totalPages = Math.ceil(filteredClients.length / CLIENTS_PER_PAGE);

	const paginatedClients = useMemo(() => {
		const startIndex = (currentPage - 1) * CLIENTS_PER_PAGE;
		const endIndex = startIndex + CLIENTS_PER_PAGE;

		return filteredClients.slice(startIndex, endIndex);
	}, [filteredClients, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedStatus, sortOption]);

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
				<p className='text-sm text-gray-500'>
					Manage your clients and track their status.
				</p>
			</div>

			<ClientsFilters
				searchTerm={searchTerm}
				selectedStatus={selectedStatus}
				sortOption={sortOption}
				onSearchChange={setSearchTerm}
				onStatusChange={setSelectedStatus}
				onSortChange={setSortOption}
			/>

			<ClientsTable clients={paginatedClients} />

			<ClientsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
