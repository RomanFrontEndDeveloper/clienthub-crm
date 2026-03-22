import { DealStatus, DealsSortOption } from '../types';

type DealsFiltersProps = {
	searchTerm: string;
	selectedStatus: 'all' | DealStatus;
	sortOption: DealsSortOption;
	onSearchChange: (value: string) => void;
	onStatusChange: (value: 'all' | DealStatus) => void;
	onSortChange: (value: DealsSortOption) => void;
};

export function DealsFilters({
	searchTerm,
	selectedStatus,
	sortOption,
	onSearchChange,
	onStatusChange,
	onSortChange,
}: DealsFiltersProps) {
	return (
		<div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
			<div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
				<div className='flex-1'>
					<input
						type='text'
						placeholder='Search by title or client...'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					/>
				</div>

				<div className='w-full lg:w-52'>
					<select
						value={selectedStatus}
						onChange={(e) =>
							onStatusChange(e.target.value as 'all' | DealStatus)
						}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					>
						<option value='all'>All statuses</option>
						<option value='lead'>Lead</option>
						<option value='negotiation'>Negotiation</option>
						<option value='won'>Won</option>
						<option value='lost'>Lost</option>
					</select>
				</div>

				<div className='w-full lg:w-52'>
					<select
						value={sortOption}
						onChange={(e) =>
							onSortChange(e.target.value as DealsSortOption)
						}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					>
						<option value='title-asc'>Title A-Z</option>
						<option value='title-desc'>Title Z-A</option>
						<option value='date-desc'>Newest</option>
						<option value='date-asc'>Oldest</option>
						<option value='value-desc'>Highest Value</option>
						<option value='value-asc'>Lowest Value</option>
					</select>
				</div>
			</div>
		</div>
	);
}
