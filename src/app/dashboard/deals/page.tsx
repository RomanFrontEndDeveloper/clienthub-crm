'use client';

import { useMemo, useState } from 'react';
import { DealsFilters } from '@/features/deals/components/DealsFilters';
import { DealsPagination } from '@/features/deals/components/DealsPagination';
import { DealsTable } from '@/features/deals/components/DealsTable';
import { useDeals } from '@/features/deals/hooks/useDeals';
import { DealsSortOption, DealStatus } from '@/features/deals/types';

const DEALS_PER_PAGE = 5;

export default function DealsPage() {
	const { data, isLoading, error } = useDeals();

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | DealStatus>(
		'all',
	);
	const [sortOption, setSortOption] = useState<DealsSortOption>('title-asc');
	const [currentPage, setCurrentPage] = useState(1);

	const dealsData = data || [];

	const filteredDeals = useMemo(() => {
		const normalizedSearchTerm = searchTerm.toLowerCase();

		const filtered = dealsData.filter((deal) => {
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
	}, [dealsData, searchTerm, selectedStatus, sortOption]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredDeals.length / DEALS_PER_PAGE),
	);

	const paginatedDeals = useMemo(() => {
		const startIndex = (currentPage - 1) * DEALS_PER_PAGE;
		const endIndex = startIndex + DEALS_PER_PAGE;

		return filteredDeals.slice(startIndex, endIndex);
	}, [filteredDeals, currentPage]);

	if (isLoading) {
		return <div>Loading deals...</div>;
	}

	if (error) {
		return <div>Something went wrong while loading deals.</div>;
	}

	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-2xl font-bold text-gray-900'>Deals</h2>
				<p className='text-sm text-gray-500'>
					Manage sales opportunities and track deal progress.
				</p>
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

			<DealsTable deals={paginatedDeals} />

			<DealsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
