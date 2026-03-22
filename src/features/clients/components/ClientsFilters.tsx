import { ClientStatus, ClientsSortOption } from '../types';

type ClientsFiltersProps = {
	searchTerm: string;
	selectedStatus: 'all' | ClientStatus;
	sortOption: ClientsSortOption;
	onSearchChange: (value: string) => void;
	onStatusChange: (value: 'all' | ClientStatus) => void;
	onSortChange: (value: ClientsSortOption) => void;
};

export function ClientsFilters({
	searchTerm,
	selectedStatus,
	sortOption,
	onSearchChange,
	onStatusChange,
	onSortChange,
}: ClientsFiltersProps) {
	return (
		<div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
			<div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
				<div className='flex-1'>
					<input
						type='text'
						placeholder='Search by name, email, or company...'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					/>
				</div>

				<div className='w-full lg:w-52'>
					<select
						value={selectedStatus}
						onChange={(e) =>
							onStatusChange(
								e.target.value as 'all' | ClientStatus,
							)
						}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					>
						<option value='all'>All statuses</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
						<option value='lead'>Lead</option>
					</select>
				</div>

				<div className='w-full lg:w-52'>
					<select
						value={sortOption}
						onChange={(e) =>
							onSortChange(e.target.value as ClientsSortOption)
						}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-gray-400'
					>
						<option value='name-asc'>Name A-Z</option>
						<option value='name-desc'>Name Z-A</option>
						<option value='date-desc'>Newest</option>
						<option value='date-asc'>Oldest</option>
					</select>
				</div>
			</div>
		</div>
	);
}
