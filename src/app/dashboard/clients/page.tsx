'use client';

import { useMemo, useState } from 'react';
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

const CLIENTS_PER_PAGE = 5;

export default function ClientsPage() {
	const { data, isLoading, error } = useClients();

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | ClientStatus>(
		'all',
	);
	const [sortOption, setSortOption] = useState<ClientsSortOption>('name-asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingClient, setEditingClient] = useState<Client | null>(null);
	const [localClients, setLocalClients] = useState<Client[]>([]);

	const clientsData = useMemo(() => {
		return localClients.length ? localClients : data || [];
	}, [localClients, data]);

	const filteredClients = useMemo(() => {
		const normalizedSearchTerm = searchTerm.toLowerCase();

		const filtered = clientsData.filter((client) => {
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
	}, [clientsData, searchTerm, selectedStatus, sortOption]);

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
		const baseClients = localClients.length ? localClients : data || [];
		const existingClient = baseClients.find(
			(item) => item.id === client.id,
		);

		if (existingClient) {
			setLocalClients((prev) =>
				(prev.length ? prev : baseClients).map((item) =>
					item.id === client.id ? client : item,
				),
			);
		} else {
			setLocalClients((prev) => [
				client,
				...(prev.length ? prev : baseClients),
			]);
		}
	};

	if (isLoading) {
		return <div>Loading clients...</div>;
	}

	if (error) {
		return <div>Something went wrong while loading clients.</div>;
	}

	const handleDeleteClient = (clientId: string) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this client?',
		);

		if (!confirmed) return;

		const baseClients = localClients.length ? localClients : data || [];
		const updatedClients = baseClients.filter(
			(client) => client.id !== clientId,
		);

		setLocalClients(updatedClients);

		const normalizedSearchTerm = searchTerm.toLowerCase();

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
