'use client';

import { useEffect, useMemo, useState } from 'react';
import { ClientsFilters } from '@/features/clients/components/ClientsFilters';
import { ClientsPagination } from '@/features/clients/components/ClientsPagination';
import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { CreateClientModal } from '@/features/clients/components/CreateClientModal';
import { useClients } from '@/features/clients/hooks/useClients';
import {
	Client,
	ClientStatus,
	ClientsSortOption,
} from '@/features/clients/types';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

const CLIENTS_PER_PAGE = 5;

export default function ClientsPage() {
	const { data, isLoading, error } = useClients();

	const {
		state: clients,
		setState: setClients,
		isHydrated,
	} = useLocalStorageState<Client[]>('crm-clients', []);

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | ClientStatus>(
		'all',
	);
	const [sortOption, setSortOption] = useState<ClientsSortOption>('name-asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingClient, setEditingClient] = useState<Client | null>(null);

	useEffect(() => {
		if (isHydrated && clients.length === 0 && data) {
			setClients(data);
		}
	}, [data, isHydrated, clients.length, setClients]);

	const filteredClients = useMemo(() => {
		const normalizedSearchTerm = searchTerm.toLowerCase().trim();

		const filtered = clients.filter((client) => {
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
	}, [clients, searchTerm, selectedStatus, sortOption]);

	const totalPages = Math.ceil(filteredClients.length / CLIENTS_PER_PAGE);

	const paginatedClients = useMemo(() => {
		const startIndex = (currentPage - 1) * CLIENTS_PER_PAGE;
		const endIndex = startIndex + CLIENTS_PER_PAGE;

		return filteredClients.slice(startIndex, endIndex);
	}, [filteredClients, currentPage]);

	const handleOpenCreateModal = () => {
		setEditingClient(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (client: Client) => {
		setEditingClient(client);
		setIsModalOpen(true);
	};

	const handleSubmitClient = (client: Client) => {
		setClients((prev) => {
			const existingClient = prev.find((item) => item.id === client.id);

			if (existingClient) {
				return prev.map((item) =>
					item.id === client.id ? client : item,
				);
			}

			return [client, ...prev];
		});

		setCurrentPage(1);
	};

	const handleDeleteClient = (clientId: string) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this client?',
		);

		if (!confirmed) return;

		const updatedClients = clients.filter(
			(client) => client.id !== clientId,
		);

		setClients(updatedClients);

		const normalizedSearchTerm = searchTerm.toLowerCase().trim();

		const filteredAfterDelete = updatedClients.filter((client) => {
			const matchesSearch =
				client.fullName.toLowerCase().includes(normalizedSearchTerm) ||
				client.email.toLowerCase().includes(normalizedSearchTerm) ||
				client.company.toLowerCase().includes(normalizedSearchTerm);

			const matchesStatus =
				selectedStatus === 'all' || client.status === selectedStatus;

			return matchesSearch && matchesStatus;
		});

		const sortedAfterDelete = [...filteredAfterDelete].sort((a, b) => {
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

		const totalPagesAfterDelete = Math.max(
			1,
			Math.ceil(sortedAfterDelete.length / CLIENTS_PER_PAGE),
		);

		if (currentPage > totalPagesAfterDelete) {
			setCurrentPage(totalPagesAfterDelete);
		}
	};

	if (isLoading && !isHydrated) {
		return <div>Loading clients...</div>;
	}

	if (error && !data && clients.length === 0) {
		return <div>Something went wrong while loading clients.</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>
						Clients
					</h2>
					<p className='text-sm text-gray-500'>
						Manage your clients and track their status.
					</p>
				</div>

				<button
					onClick={handleOpenCreateModal}
					className='rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800'
				>
					Add Client
				</button>
			</div>

			<ClientsFilters
				searchTerm={searchTerm}
				selectedStatus={selectedStatus}
				sortOption={sortOption}
				onSearchChange={(value) => {
					setSearchTerm(value);
					setCurrentPage(1);
				}}
				onStatusChange={(value) => {
					setSelectedStatus(value);
					setCurrentPage(1);
				}}
				onSortChange={(value) => {
					setSortOption(value);
					setCurrentPage(1);
				}}
			/>

			<ClientsTable
				clients={paginatedClients}
				onEditClient={handleOpenEditModal}
				onDeleteClient={handleDeleteClient}
			/>

			<ClientsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>

			{isModalOpen && (
				<CreateClientModal
					onClose={() => {
						setIsModalOpen(false);
						setEditingClient(null);
					}}
					onSubmit={handleSubmitClient}
					initialData={editingClient}
				/>
			)}
		</div>
	);
}
