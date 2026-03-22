import { Deal } from '../types';
import { DealStatusBadge } from './DealStatusBadge';

type DealsTableProps = {
	deals: Deal[];
};

export function DealsTable({ deals }: DealsTableProps) {
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
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={6}
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
