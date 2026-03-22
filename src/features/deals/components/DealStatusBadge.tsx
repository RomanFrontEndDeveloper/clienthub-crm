import { DealStatus } from '../types';

type DealStatusBadgeProps = {
	status: DealStatus;
};

const statusStyles: Record<DealStatus, string> = {
	lead: 'bg-blue-100 text-blue-700',
	negotiation: 'bg-yellow-100 text-yellow-700',
	won: 'bg-green-100 text-green-700',
	lost: 'bg-red-100 text-red-700',
};

export function DealStatusBadge({ status }: DealStatusBadgeProps) {
	return (
		<span
			className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
		>
			{status}
		</span>
	);
}
