type ClientsPaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function ClientsPagination({
	currentPage,
	totalPages,
	onPageChange,
}: ClientsPaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<div className='flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm'>
			<button
				type='button'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
			>
				Previous
			</button>

			<p className='text-sm text-gray-600'>
				Page <span className='font-semibold'>{currentPage}</span> of{' '}
				<span className='font-semibold'>{totalPages}</span>
			</p>

			<button
				type='button'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
			>
				Next
			</button>
		</div>
	);
}
