type Props = {
	status: 'todo' | 'in_progress' | 'done';
};

export function TaskStatusBadge({ status }: Props) {
	const styles = {
		todo: 'bg-gray-100 text-gray-700',
		in_progress: 'bg-blue-100 text-blue-700',
		done: 'bg-green-100 text-green-700',
	};

	const labels = {
		todo: 'To Do',
		in_progress: 'In Progress',
		done: 'Done',
	};

	return (
		<span
			className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
		>
			{labels[status]}
		</span>
	);
}
