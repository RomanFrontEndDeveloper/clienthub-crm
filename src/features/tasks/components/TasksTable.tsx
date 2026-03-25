import { Task } from '../types';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskStatusBadge } from './TaskStatusBadge';

type Props = {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (taskId: string) => void;
};

function isTaskOverdue(task: Task) {
	if (task.status === 'done') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDate = new Date(task.dueDate);
	dueDate.setHours(0, 0, 0, 0);

	return dueDate < today;
}

export function TasksTable({ tasks, onEdit, onDelete }: Props) {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full text-left text-sm'>
				<thead className='bg-gray-50 text-gray-600'>
					<tr>
						<th className='px-4 py-3 font-semibold'>Title</th>
						<th className='px-4 py-3 font-semibold'>Status</th>
						<th className='px-4 py-3 font-semibold'>Priority</th>
						<th className='px-4 py-3 font-semibold'>Due Date</th>
						<th className='px-4 py-3 font-semibold'>Assigned</th>
						<th className='px-4 py-3 font-semibold'>Related To</th>
						<th className='px-4 py-3 font-semibold'>Overdue</th>
						<th className='px-4 py-3 font-semibold'>Actions</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-gray-100'>
					{tasks.map((task) => {
						const overdue = isTaskOverdue(task);

						return (
							<tr key={task.id} className='hover:bg-gray-50'>
								<td className='px-4 py-3'>
									<div className='font-medium text-gray-900'>
										{task.title}
									</div>
									<div className='text-xs text-gray-500'>
										{task.description}
									</div>
								</td>

								<td className='px-4 py-3'>
									<TaskStatusBadge status={task.status} />
								</td>

								<td className='px-4 py-3'>
									<TaskPriorityBadge
										priority={task.priority}
									/>
								</td>

								<td className='px-4 py-3 text-gray-700'>
									{task.dueDate}
								</td>

								<td className='px-4 py-3 text-gray-700'>
									{task.assignedTo}
								</td>

								<td className='px-4 py-3 text-gray-700'>
									{task.relatedTo || '-'}
								</td>

								<td className='px-4 py-3'>
									<span
										className={`rounded-full px-3 py-1 text-xs font-medium ${
											overdue
												? 'bg-red-100 text-red-700'
												: 'bg-gray-100 text-gray-700'
										}`}
									>
										{overdue ? 'Overdue' : 'On time'}
									</span>
								</td>

								<td className='px-4 py-3'>
									<div className='flex items-center gap-2'>
										<button
											type='button'
											onClick={() => onEdit(task)}
											className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
										>
											Edit
										</button>

										<button
											type='button'
											onClick={() => onDelete(task.id)}
											className='rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50'
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
