import { TaskPriority, TaskStatus, TasksSortOption } from '../types';

type Props = {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	status: 'all' | TaskStatus;
	onStatusChange: (value: 'all' | TaskStatus) => void;
	priority: 'all' | TaskPriority;
	onPriorityChange: (value: 'all' | TaskPriority) => void;
	sort: TasksSortOption;
	onSortChange: (value: TasksSortOption) => void;
	showOverdueOnly: boolean;
	onToggleOverdue: (value: boolean) => void;
};

export function TasksFilters({
	searchTerm,
	onSearchChange,
	status,
	onStatusChange,
	priority,
	onPriorityChange,
	sort,
	onSortChange,
	showOverdueOnly,
	onToggleOverdue,
}: Props) {
	return (
		<div className='grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-5'>
			<input
				type='text'
				placeholder='Search tasks...'
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
			/>

			<select
				value={status}
				onChange={(e) =>
					onStatusChange(e.target.value as 'all' | TaskStatus)
				}
				className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
			>
				<option value='all'>All statuses</option>
				<option value='todo'>To Do</option>
				<option value='in_progress'>In Progress</option>
				<option value='done'>Done</option>
			</select>

			<select
				value={priority}
				onChange={(e) =>
					onPriorityChange(e.target.value as 'all' | TaskPriority)
				}
				className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
			>
				<option value='all'>All priorities</option>
				<option value='low'>Low</option>
				<option value='medium'>Medium</option>
				<option value='high'>High</option>
			</select>

			<select
				value={sort}
				onChange={(e) =>
					onSortChange(e.target.value as TasksSortOption)
				}
				className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
			>
				<option value='dueDate-asc'>Due date ↑</option>
				<option value='dueDate-desc'>Due date ↓</option>
				<option value='priority-desc'>Priority high → low</option>
				<option value='priority-asc'>Priority low → high</option>
				<option value='createdAt-desc'>Newest</option>
				<option value='createdAt-asc'>Oldest</option>
				<option value='title-asc'>Title A-Z</option>
				<option value='title-desc'>Title Z-A</option>
			</select>

			<label className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700'>
				<input
					type='checkbox'
					checked={showOverdueOnly}
					onChange={(e) => onToggleOverdue(e.target.checked)}
				/>
				Overdue only
			</label>
		</div>
	);
}
