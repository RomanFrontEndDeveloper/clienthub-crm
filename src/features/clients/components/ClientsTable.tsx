import { Client } from '../types';
import { ClientStatusBadge } from './ClientStatusBadge';

type ClientsTableProps = {
	clients: Client[];
	onEditClient: (client: Client) => void;
	onDeleteClient: (clientId: string) => void;
};

export function ClientsTable({
	clients,
	onEditClient,
	onDeleteClient,
}: ClientsTableProps) {
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
							<th className='px-4 py-3 font-semibold'>Actions</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-100'>
						{clients.length > 0 ? (
							clients.map((client) => (
								<tr
									key={client.id}
									className='hover:bg-gray-50'
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
										<ClientStatusBadge
											status={client.status}
										/>
									</td>
									<td className='px-4 py-3 text-gray-600'>
										{client.source}
									</td>
									<td className='px-4 py-3 text-gray-600'>
										{client.createdAt}
									</td>
									<td className='px-4 py-3'>
										<div className='flex items-center gap-2'>
											<button
												type='button'
												onClick={() =>
													onEditClient(client)
												}
												className='rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100'
											>
												Edit
											</button>

											<button
												type='button'
												onClick={() =>
													onDeleteClient(client.id)
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
									No clients found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
