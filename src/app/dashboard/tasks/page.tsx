'use client';

import { useEffect, useMemo, useState } from 'react';
import { CreateTaskModal } from '@/features/tasks/components/CreateTaskModal';
import { TasksFilters } from '@/features/tasks/components/TasksFilters';
import { TasksPagination } from '@/features/tasks/components/TasksPagination';
import { TasksTable } from '@/features/tasks/components/TasksTable';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import {
	Task,
	TaskPriority,
	TaskStatus,
	TasksSortOption,
} from '@/features/tasks/types';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

const ITEMS_PER_PAGE = 5;

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

export default function TasksPage() {
	const { data, isLoading, error } = useTasks();

	const {
		state: tasks,
		setState: setTasks,
		isHydrated,
	} = useLocalStorageState<Task[]>('crm-tasks', []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

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

	useEffect(() => {
		if (isHydrated && tasks.length === 0 && data) {
			setTasks(data);
		}
	}, [data, isHydrated, tasks.length, setTasks]);

	const filteredTasks = useMemo(() => {
		const normalizedSearchTerm = searchTerm.toLowerCase().trim();

		const filtered = tasks.filter((task) => {
			const matchesSearch =
				task.title.toLowerCase().includes(normalizedSearchTerm) ||
				task.description.toLowerCase().includes(normalizedSearchTerm) ||
				task.assignedTo.toLowerCase().includes(normalizedSearchTerm) ||
				(task.relatedTo ?? '')
					.toLowerCase()
					.includes(normalizedSearchTerm);

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

		const sorted = [...filtered].sort((a, b) => {
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
		tasks,
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

	const handleOpenCreateModal = () => {
		setEditingTask(null);
		setIsModalOpen(true);
	};

	const handleEditTask = (task: Task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleDeleteTask = (taskId: string) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this task?',
		);

		if (!confirmed) return;

		setTasks((prev) => prev.filter((task) => task.id !== taskId));
	};

	const handleSaveTask = (savedTask: Task) => {
		setTasks((prev) => {
			const isExistingTask = prev.some(
				(task) => task.id === savedTask.id,
			);

			if (isExistingTask) {
				return prev.map((task) =>
					task.id === savedTask.id ? savedTask : task,
				);
			}

			return [savedTask, ...prev];
		});

		setCurrentPage(1);
		setEditingTask(null);
	};

	if (isLoading && !isHydrated) {
		return (
			<div className='rounded-xl bg-white p-6 shadow-sm'>
				Loading tasks...
			</div>
		);
	}

	if (error && !data && tasks.length === 0) {
		return (
			<div className='rounded-xl bg-white p-6 text-red-500 shadow-sm'>
				Failed to load tasks.
			</div>
		);
	}

	return (
		<>
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
						onClick={handleOpenCreateModal}
						className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800'
					>
						+ Add Task
					</button>
				</div>

				<TasksFilters
					searchTerm={searchTerm}
					onSearchChange={(value) => {
						setSearchTerm(value);
						setCurrentPage(1);
					}}
					status={selectedStatus}
					onStatusChange={(value) => {
						setSelectedStatus(value);
						setCurrentPage(1);
					}}
					priority={selectedPriority}
					onPriorityChange={(value) => {
						setSelectedPriority(value);
						setCurrentPage(1);
					}}
					sort={sortOption}
					onSortChange={(value) => {
						setSortOption(value);
						setCurrentPage(1);
					}}
					showOverdueOnly={showOverdueOnly}
					onToggleOverdue={(value) => {
						setShowOverdueOnly(value);
						setCurrentPage(1);
					}}
				/>

				<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
					<TasksTable
						tasks={paginatedTasks}
						onEdit={handleEditTask}
						onDelete={handleDeleteTask}
					/>
					<TasksPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>

			{isModalOpen && (
				<CreateTaskModal
					onClose={() => {
						setIsModalOpen(false);
						setEditingTask(null);
					}}
					onSubmit={handleSaveTask}
					initialData={editingTask}
				/>
			)}
		</>
	);
}
