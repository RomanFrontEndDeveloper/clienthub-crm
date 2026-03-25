'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormValues } from '@/schemas/taskSchema';
import { Task } from '../types';

type Props = {
	onClose: () => void;
	onSubmit: (task: Task) => void;
	initialData?: Task | null;
};

const defaultValues: TaskFormValues = {
	title: '',
	description: '',
	status: 'todo',
	priority: 'medium',
	dueDate: '',
	assignedTo: '',
	relatedTo: '',
};

export function CreateTaskModal({
	onClose,
	onSubmit,
	initialData = null,
}: Props) {
	const isEditMode = Boolean(initialData);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormValues>({
		resolver: zodResolver(taskSchema),
		defaultValues,
	});

	useEffect(() => {
		if (initialData) {
			reset({
				title: initialData.title,
				description: initialData.description,
				status: initialData.status,
				priority: initialData.priority,
				dueDate: initialData.dueDate,
				assignedTo: initialData.assignedTo,
				relatedTo: initialData.relatedTo ?? '',
			});
		} else {
			reset(defaultValues);
		}
	}, [initialData, reset]);

	const handleFormSubmit = (values: TaskFormValues) => {
		const task: Task = {
			id: initialData?.id ?? Date.now().toString(),
			title: values.title,
			description: values.description,
			status: values.status,
			priority: values.priority,
			dueDate: values.dueDate,
			assignedTo: values.assignedTo,
			relatedTo: values.relatedTo?.trim() || '',
			createdAt:
				initialData?.createdAt ??
				new Date().toISOString().split('T')[0],
		};

		onSubmit(task);
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
			<div className='w-full max-w-2xl rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
					<div>
						<h2 className='text-xl font-semibold text-gray-900'>
							{isEditMode ? 'Edit Task' : 'Create Task'}
						</h2>
						<p className='text-sm text-gray-500'>
							{isEditMode
								? 'Update task details'
								: 'Add a new task to your CRM'}
						</p>
					</div>

					<button
						type='button'
						onClick={onClose}
						className='rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
					>
						Close
					</button>
				</div>

				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className='space-y-5 px-6 py-5'
				>
					<div className='grid gap-5 md:grid-cols-2'>
						<div className='md:col-span-2'>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Title
							</label>
							<input
								type='text'
								{...register('title')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
								placeholder='Enter task title'
							/>
							{errors.title && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.title.message}
								</p>
							)}
						</div>

						<div className='md:col-span-2'>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Description
							</label>
							<textarea
								{...register('description')}
								rows={4}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
								placeholder='Enter task description'
							/>
							{errors.description && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.description.message}
								</p>
							)}
						</div>

						<div>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								{...register('status')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
							>
								<option value='todo'>To Do</option>
								<option value='in_progress'>In Progress</option>
								<option value='done'>Done</option>
							</select>
							{errors.status && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.status.message}
								</p>
							)}
						</div>

						<div>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Priority
							</label>
							<select
								{...register('priority')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
							{errors.priority && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.priority.message}
								</p>
							)}
						</div>

						<div>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Due Date
							</label>
							<input
								type='date'
								{...register('dueDate')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
							/>
							{errors.dueDate && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.dueDate.message}
								</p>
							)}
						</div>

						<div>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Assigned To
							</label>
							<input
								type='text'
								{...register('assignedTo')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
								placeholder='Enter assignee name'
							/>
							{errors.assignedTo && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.assignedTo.message}
								</p>
							)}
						</div>

						<div className='md:col-span-2'>
							<label className='mb-1 block text-sm font-medium text-gray-700'>
								Related To
							</label>
							<input
								type='text'
								{...register('relatedTo')}
								className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
								placeholder='Client, deal, project...'
							/>
							{errors.relatedTo && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.relatedTo.message}
								</p>
							)}
						</div>
					</div>

					<div className='flex items-center justify-end gap-3 border-t border-gray-200 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
						>
							Cancel
						</button>

						<button
							type='submit'
							className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800'
						>
							{isEditMode ? 'Save Changes' : 'Create Task'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
