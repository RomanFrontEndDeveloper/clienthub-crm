'use client';

import { useMemo, useState } from 'react';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import {
	Task,
	TaskPriority,
	TaskStatus,
	TasksSortOption,
} from '@/features/tasks/types';

function isTaskOverdue(task: Task) {
	if (task.status === 'done') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDate = new Date(task.dueDate);
	dueDate.setHours(0, 0, 0, 0);

	return dueDate < today;
}

function getPriorityWeight(priority: TaskPriority) {
	switch (priority) {
		case 'high':
			return 3;
		case 'medium':
			return 2;
		case 'low':
			return 1;
		default:
			return 0;
	}
}

const ITEMS_PER_PAGE = 5;

export default function TasksPage() {
	const { data, isLoading, error } = useTasks();

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<'all' | TaskStatus>(
		'all',
	);
	const [selectedPriority, setSelectedPriority] = useState<
		'all' | TaskPriority
	>('all');
	const [showOverdueOnly, setShowOverdueOnly] = useState(false);
	const [sortOption, setSortOption] =
		useState<TasksSortOption>('dueDate-asc');
	const [currentPage, setCurrentPage] = useState(1);

	const filteredTasks = useMemo(() => {
		if (!data) return [];

		const normalizedSearch = searchTerm.toLowerCase().trim();

		const result = data.filter((task) => {
			const matchesSearch =
				task.title.toLowerCase().includes(normalizedSearch) ||
				task.description.toLowerCase().includes(normalizedSearch) ||
				task.assignedTo.toLowerCase().includes(normalizedSearch) ||
				(task.relatedTo ?? '').toLowerCase().includes(normalizedSearch);

			const matchesStatus =
				selectedStatus === 'all' || task.status === selectedStatus;

			const matchesPriority =
				selectedPriority === 'all' ||
				task.priority === selectedPriority;

			const matchesOverdue = !showOverdueOnly || isTaskOverdue(task);

			return (
				matchesSearch &&
				matchesStatus &&
				matchesPriority &&
				matchesOverdue
			);
		});

		const sorted = [...result].sort((a, b) => {
			switch (sortOption) {
				case 'dueDate-asc':
					return (
						new Date(a.dueDate).getTime() -
						new Date(b.dueDate).getTime()
					);
				case 'dueDate-desc':
					return (
						new Date(b.dueDate).getTime() -
						new Date(a.dueDate).getTime()
					);
				case 'priority-desc':
					return (
						getPriorityWeight(b.priority) -
						getPriorityWeight(a.priority)
					);
				case 'priority-asc':
					return (
						getPriorityWeight(a.priority) -
						getPriorityWeight(b.priority)
					);
				case 'createdAt-desc':
					return (
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
					);
				case 'createdAt-asc':
					return (
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime()
					);
				case 'title-asc':
					return a.title.localeCompare(b.title);
				case 'title-desc':
					return b.title.localeCompare(a.title);
				default:
					return 0;
			}
		});

		return sorted;
	}, [
		data,
		searchTerm,
		selectedStatus,
		selectedPriority,
		showOverdueOnly,
		sortOption,
	]);

	const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

	const paginatedTasks = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;

		return filteredTasks.slice(startIndex, endIndex);
	}, [filteredTasks, currentPage]);

	if (isLoading) {
		return (
			<div className='rounded-xl bg-white p-6 shadow-sm'>
				Loading tasks...
			</div>
		);
	}

	if (error) {
		return (
			<div className='rounded-xl bg-white p-6 shadow-sm text-red-500'>
				Failed to load tasks.
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold text-gray-900'>
						Tasks
					</h1>
					<p className='text-sm text-gray-500'>
						Manage tasks, deadlines, and priorities
					</p>
				</div>

				<button
					type='button'
					className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800'
				>
					+ Add Task
				</button>
			</div>

			<div className='grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-5'>
				<input
					type='text'
					placeholder='Search tasks...'
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1);
					}}
					className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
				/>

				<select
					value={selectedStatus}
					onChange={(e) => {
						setSelectedStatus(e.target.value as 'all' | TaskStatus);
						setCurrentPage(1);
					}}
					className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
				>
					<option value='all'>All statuses</option>
					<option value='todo'>To Do</option>
					<option value='in_progress'>In Progress</option>
					<option value='done'>Done</option>
				</select>

				<select
					value={selectedPriority}
					onChange={(e) => {
						setSelectedPriority(
							e.target.value as 'all' | TaskPriority,
						);
						setCurrentPage(1);
					}}
					className='rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
				>
					<option value='all'>All priorities</option>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>

				<select
					value={sortOption}
					onChange={(e) => {
						setSortOption(e.target.value as TasksSortOption);
						setCurrentPage(1);
					}}
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
						onChange={(e) => {
							setShowOverdueOnly(e.target.checked);
							setCurrentPage(1);
						}}
					/>
					Overdue only
				</label>
			</div>

			<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
				<div className='overflow-x-auto'>
					<table className='min-w-full text-left text-sm'>
						<thead className='bg-gray-50 text-gray-600'>
							<tr>
								<th className='px-4 py-3 font-semibold'>
									Title
								</th>
								<th className='px-4 py-3 font-semibold'>
									Status
								</th>
								<th className='px-4 py-3 font-semibold'>
									Priority
								</th>
								<th className='px-4 py-3 font-semibold'>
									Due Date
								</th>
								<th className='px-4 py-3 font-semibold'>
									Assigned To
								</th>
								<th className='px-4 py-3 font-semibold'>
									Related To
								</th>
								<th className='px-4 py-3 font-semibold'>
									Overdue
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-100'>
							{paginatedTasks.map((task) => {
								const overdue = isTaskOverdue(task);

								return (
									<tr
										key={task.id}
										className='hover:bg-gray-50'
									>
										<td className='px-4 py-3'>
											<div className='font-medium text-gray-900'>
												{task.title}
											</div>
											<div className='text-xs text-gray-500'>
												{task.description}
											</div>
										</td>

										<td className='px-4 py-3 text-gray-700'>
											{task.status}
										</td>
										<td className='px-4 py-3 text-gray-700'>
											{task.priority}
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
												{overdue
													? 'Overdue'
													: 'On time'}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<div className='flex items-center justify-between border-t border-gray-200 px-4 py-3'>
					<p className='text-sm text-gray-500'>
						Page {currentPage} of {totalPages || 1}
					</p>

					<div className='flex gap-2'>
						<button
							type='button'
							onClick={() =>
								setCurrentPage((prev) => Math.max(prev - 1, 1))
							}
							disabled={currentPage === 1}
							className='rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
						>
							Previous
						</button>

						<button
							type='button'
							onClick={() =>
								setCurrentPage((prev) =>
									Math.min(prev + 1, totalPages || 1),
								)
							}
							disabled={
								currentPage === totalPages || totalPages === 0
							}
							className='rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
