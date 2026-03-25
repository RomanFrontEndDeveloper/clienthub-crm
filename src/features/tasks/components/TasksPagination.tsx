type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function TasksPagination({
	currentPage,
	totalPages,
	onPageChange,
}: Props) {
	return (
		<div className='flex items-center justify-between border-t border-gray-200 px-4 py-3'>
			<p className='text-sm text-gray-500'>
				Page {currentPage} of {totalPages || 1}
			</p>

			<div className='flex gap-2'>
				<button
					onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}
					className='rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50'
				>
					Previous
				</button>

				<button
					onClick={() =>
						onPageChange(Math.min(currentPage + 1, totalPages || 1))
					}
					disabled={currentPage === totalPages || totalPages === 0}
					className='rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50'
				>
					Next
				</button>
			</div>
		</div>
	);
}
