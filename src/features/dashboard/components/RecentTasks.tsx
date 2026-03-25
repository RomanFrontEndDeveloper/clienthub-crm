import { Task } from '@/features/tasks/types';

type Props = {
	tasks: Task[];
};

function isTaskOverdue(task: Task) {
	if (task.status === 'done') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDate = new Date(task.dueDate);
	dueDate.setHours(0, 0, 0, 0);

	return dueDate < today;
}

export function RecentTasks({ tasks }: Props) {
	const recentTasks = [...tasks]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	return (
		<div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='border-b border-gray-200 px-5 py-4'>
				<h3 className='text-lg font-semibold text-gray-900'>
					Recent Tasks
				</h3>
				<p className='text-sm text-gray-500'>
					Latest tasks added to the system
				</p>
			</div>

			<div className='divide-y divide-gray-100'>
				{recentTasks.length > 0 ? (
					recentTasks.map((task) => {
						const overdue = isTaskOverdue(task);

						return (
							<div
								key={task.id}
								className='flex items-center justify-between px-5 py-4'
							>
								<div>
									<p className='font-medium text-gray-900'>
										{task.title}
									</p>
									<p className='text-sm text-gray-500'>
										Due: {task.dueDate}
									</p>
								</div>

								<span
									className={`rounded-full px-3 py-1 text-xs font-medium ${
										task.status === 'done'
											? 'bg-green-100 text-green-700'
											: overdue
												? 'bg-red-100 text-red-700'
												: 'bg-gray-100 text-gray-700'
									}`}
								>
									{task.status === 'done'
										? 'Done'
										: overdue
											? 'Overdue'
											: 'Open'}
								</span>
							</div>
						);
					})
				) : (
					<div className='px-5 py-6 text-sm text-gray-500'>
						No tasks yet.
					</div>
				)}
			</div>
		</div>
	);
}
