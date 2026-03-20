import { Client } from '../types';
import { ClientStatusBadge } from './ClientStatusBadge';

type ClientsTableProps = {
	clients: Client[];
};

export function ClientsTable({ clients }: ClientsTableProps) {
	return (
		<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='min-w-full text-left text-sm'>
					<thead className='bg-gray-50 text-gray-600'>
						<tr>
							<th className='px-4 py-3 font-semibold'>Name</th>
							<th className='px-4 py-3 font-semibold'>Email</th>
							<th className='px-4 py-3 font-semibold'>Company</th>
							<th className='px-4 py-3 font-semibold'>Status</th>
							<th className='px-4 py-3 font-semibold'>Source</th>
							<th className='px-4 py-3 font-semibold'>
								Created At
							</th>
						</tr>
					</thead>

					<tbody>
						{clients.map((client) => (
							<tr
								key={client.id}
								className='border-t border-gray-200 hover:bg-gray-50'
							>
								<td className='px-4 py-3 font-medium text-gray-900'>
									{client.fullName}
								</td>
								<td className='px-4 py-3 text-gray-600'>
									{client.email}
								</td>
								<td className='px-4 py-3 text-gray-600'>
									{client.company}
								</td>
								<td className='px-4 py-3'>
									<ClientStatusBadge status={client.status} />
								</td>
								<td className='px-4 py-3 text-gray-600'>
									{client.source}
								</td>
								<td className='px-4 py-3 text-gray-600'>
									{client.createdAt}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
