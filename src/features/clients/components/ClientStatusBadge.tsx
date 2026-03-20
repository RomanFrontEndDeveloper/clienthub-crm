import { ClientStatus } from '../types';

type ClientStatusBadgeProps = {
	status: ClientStatus;
};

const statusStyles: Record<ClientStatus, string> = {
	active: 'bg-green-100 text-green-700',
	inactive: 'bg-gray-200 text-gray-700',
	lead: 'bg-blue-100 text-blue-700',
};

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
	return (
		<span
			className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
		>
			{status}
		</span>
	);
}
