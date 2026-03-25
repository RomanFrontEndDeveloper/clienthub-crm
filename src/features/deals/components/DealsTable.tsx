import { Deal } from '../types';
import { DealStatusBadge } from './DealStatusBadge';

type DealsTableProps = {
	deals: Deal[];
	onEditDeal: (deal: Deal) => void;
	onDeleteDeal: (dealId: string) => void;
};

export function DealsTable({
	deals,
	onEditDeal,
	onDeleteDeal,
}: DealsTableProps) {
	return (
		<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='min-w-full text-left text-sm'>
					<thead className='bg-gray-50 text-gray-600'>
						<tr>
							<th className='px-4 py-3 font-semibold'>Title</th>
							<th className='px-4 py-3 font-semibold'>Client</th>
							<th className='px-4 py-3 font-semibold'>Value</th>
							<th className='px-4 py-3 font-semibold'>Status</th>
							<th className='px-4 py-3 font-semibold'>Manager</th>
							<th className='px-4 py-3 font-semibold'>
								Created At
							</th>
							<th className='px-4 py-3 font-semibold'>Actions</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-100'>
						{deals.length > 0 ? (
							deals.map((deal) => (
								<tr key={deal.id} className='hover:bg-gray-50'>
									<td className='px-4 py-3 font-medium text-gray-900'>
										{deal.title}
									</td>
									<td className='px-4 py-3 text-gray-600'>
										{deal.clientName}
									</td>
									<td className='px-4 py-3 text-gray-600'>
										${deal.value.toLocaleString()}
									</td>
									<td className='px-4 py-3'>
										<DealStatusBadge status={deal.status} />
									</td>
									<td className='px-4 py-3 text-gray-600'>
										{deal.manager}
									</td>
									<td className='px-4 py-3 text-gray-600'>
										{deal.createdAt}
									</td>
									<td className='px-4 py-3'>
										<div className='flex items-center gap-2'>
											<button
												type='button'
												onClick={() => onEditDeal(deal)}
												className='rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100'
											>
												Edit
											</button>

											<button
												type='button'
												onClick={() =>
													onDeleteDeal(deal.id)
												}
												className='rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50'
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={7}
									className='px-4 py-8 text-center text-sm text-gray-500'
								>
									No deals found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
