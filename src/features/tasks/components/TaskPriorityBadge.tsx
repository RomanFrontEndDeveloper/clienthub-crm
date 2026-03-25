type Props = {
	priority: 'low' | 'medium' | 'high';
};

export function TaskPriorityBadge({ priority }: Props) {
	const styles = {
		low: 'bg-gray-100 text-gray-700',
		medium: 'bg-yellow-100 text-yellow-700',
		high: 'bg-red-100 text-red-700',
	};

	const labels = {
		low: 'Low',
		medium: 'Medium',
		high: 'High',
	};

	return (
		<span
			className={`rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
		>
			{labels[priority]}
		</span>
	);
}
