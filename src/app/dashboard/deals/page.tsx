'use client';

import { useEffect, useMemo, useState } from 'react';
import { CreateDealModal } from '@/features/deals/components/CreateDealModal';
import { DealsFilters } from '@/features/deals/components/DealsFilters';
import { DealsPagination } from '@/features/deals/components/DealsPagination';
import { DealsTable } from '@/features/deals/components/DealsTable';
import { useDeals } from '@/features/deals/hooks/useDeals';
import { Deal, DealsSortOption, DealStatus } from '@/features/deals/types';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

const DEALS_PER_PAGE = 5;

export default function DealsPage() {
	const { data, isLoading, error } = useDeals();

	const {
		state: deals,
		setState: setDeals,
		isHydrated,
	} = useLocalStorageState<Deal[]>('crm-deals', []);

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | DealStatus>(
		'all',
	);
	const [sortOption, setSortOption] = useState<DealsSortOption>('title-asc');
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

	useEffect(() => {
		if (isHydrated && deals.length === 0 && data) {
			setDeals(data);
		}
	}, [data, isHydrated, deals.length, setDeals]);

	const filteredDeals = useMemo(() => {
		const normalizedSearchTerm = searchTerm.toLowerCase().trim();

		const filtered = deals.filter((deal) => {
			const matchesSearch =
				deal.title.toLowerCase().includes(normalizedSearchTerm) ||
				deal.clientName.toLowerCase().includes(normalizedSearchTerm);

			const matchesStatus =
				selectedStatus === 'all' || deal.status === selectedStatus;

			return matchesSearch && matchesStatus;
		});

		const sorted = [...filtered].sort((a, b) => {
			switch (sortOption) {
				case 'title-asc':
					return a.title.localeCompare(b.title);

				case 'title-desc':
					return b.title.localeCompare(a.title);

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

				case 'value-desc':
					return b.value - a.value;

				case 'value-asc':
					return a.value - b.value;

				default:
					return 0;
			}
		});

		return sorted;
	}, [deals, searchTerm, selectedStatus, sortOption]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredDeals.length / DEALS_PER_PAGE),
	);

	const paginatedDeals = useMemo(() => {
		const startIndex = (currentPage - 1) * DEALS_PER_PAGE;
		const endIndex = startIndex + DEALS_PER_PAGE;

		return filteredDeals.slice(startIndex, endIndex);
	}, [filteredDeals, currentPage]);

	const handleOpenCreateModal = () => {
		setEditingDeal(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (deal: Deal) => {
		setEditingDeal(deal);
		setIsModalOpen(true);
	};

	const handleSubmitDeal = (deal: Deal) => {
		setDeals((prev) => {
			const existingDeal = prev.find((item) => item.id === deal.id);

			if (existingDeal) {
				return prev.map((item) => (item.id === deal.id ? deal : item));
			}

			return [deal, ...prev];
		});

		setCurrentPage(1);
	};

	const handleDeleteDeal = (dealId: string) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this deal?',
		);

		if (!confirmed) return;

		const updatedDeals = deals.filter((deal) => deal.id !== dealId);

		setDeals(updatedDeals);

		const normalizedSearchTerm = searchTerm.toLowerCase().trim();

		const filteredAfterDelete = updatedDeals.filter((deal) => {
			const matchesSearch =
				deal.title.toLowerCase().includes(normalizedSearchTerm) ||
				deal.clientName.toLowerCase().includes(normalizedSearchTerm);

			const matchesStatus =
				selectedStatus === 'all' || deal.status === selectedStatus;

			return matchesSearch && matchesStatus;
		});

		const sortedAfterDelete = [...filteredAfterDelete].sort((a, b) => {
			switch (sortOption) {
				case 'title-asc':
					return a.title.localeCompare(b.title);

				case 'title-desc':
					return b.title.localeCompare(a.title);

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

				case 'value-desc':
					return b.value - a.value;

				case 'value-asc':
					return a.value - b.value;

				default:
					return 0;
			}
		});

		const totalPagesAfterDelete = Math.max(
			1,
			Math.ceil(sortedAfterDelete.length / DEALS_PER_PAGE),
		);

		if (currentPage > totalPagesAfterDelete) {
			setCurrentPage(totalPagesAfterDelete);
		}
	};

	if (isLoading && !isHydrated) {
		return <div>Loading deals...</div>;
	}

	if (error && !data && deals.length === 0) {
		return <div>Something went wrong while loading deals.</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>Deals</h2>
					<p className='text-sm text-gray-500'>
						Manage sales opportunities and track deal progress.
					</p>
				</div>

				<button
					onClick={handleOpenCreateModal}
					className='rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800'
				>
					Add Deal
				</button>
			</div>

			<DealsFilters
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

			<DealsTable
				deals={paginatedDeals}
				onEditDeal={handleOpenEditModal}
				onDeleteDeal={handleDeleteDeal}
			/>

			<DealsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>

			{isModalOpen && (
				<CreateDealModal
					onClose={() => {
						setIsModalOpen(false);
						setEditingDeal(null);
					}}
					onSubmit={handleSubmitDeal}
					initialData={editingDeal}
				/>
			)}
		</div>
	);
}
