'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	dealSchema,
	DealFormValues,
	DealFormOutput,
} from '@/schemas/dealSchema';
import { Client } from '@/features/clients/types';
import { Deal } from '../types';

type Props = {
	onClose: () => void;
	onSubmit: (deal: Deal) => void;
	initialData?: Deal | null;
	clients: Client[];
};

const defaultValues: DealFormValues = {
	title: '',
	value: 0,
	status: 'new',
	clientId: '',
};

export function CreateDealModal({
	onClose,
	onSubmit,
	initialData = null,
	clients,
}: Props) {
	const isEditMode = Boolean(initialData);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DealFormValues, unknown, DealFormOutput>({
		resolver: zodResolver(dealSchema),
		defaultValues,
	});

	useEffect(() => {
		if (initialData) {
			reset({
				title: initialData.title,
				value: initialData.value,
				status: initialData.status,
				clientId: initialData.clientId,
			});
		} else {
			reset(defaultValues);
		}
	}, [initialData, reset]);

	const handleFormSubmit = (values: DealFormOutput) => {
		const selectedClient = clients.find(
			(client) => client.id === values.clientId,
		);

		if (!selectedClient) return;

		const deal: Deal = {
			id: initialData?.id ?? Date.now().toString(),
			title: values.title,
			value: values.value,
			status: values.status,
			clientId: selectedClient.id,
			clientName: selectedClient.fullName,
			createdAt:
				initialData?.createdAt ??
				new Date().toISOString().split('T')[0],
		};

		onSubmit(deal);
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
			<div className='w-full max-w-xl rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
					<div>
						<h2 className='text-xl font-semibold text-gray-900'>
							{isEditMode ? 'Edit Deal' : 'Create Deal'}
						</h2>
						<p className='text-sm text-gray-500'>
							{isEditMode
								? 'Update deal details'
								: 'Add a new deal to your CRM'}
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
					<div>
						<label className='mb-1 block text-sm font-medium text-gray-700'>
							Title
						</label>
						<input
							type='text'
							{...register('title')}
							className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
							placeholder='Enter deal title'
						/>
						{errors.title && (
							<p className='mt-1 text-sm text-red-500'>
								{errors.title.message}
							</p>
						)}
					</div>

					<div>
						<label className='mb-1 block text-sm font-medium text-gray-700'>
							Value
						</label>
						<input
							type='number'
							{...register('value')}
							className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
							placeholder='Enter deal value'
						/>
						{errors.value && (
							<p className='mt-1 text-sm text-red-500'>
								{errors.value.message}
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
							<option value='new'>New</option>
							<option value='in_progress'>In Progress</option>
							<option value='closed'>Closed</option>
							<option value='lost'>Lost</option>
						</select>
						{errors.status && (
							<p className='mt-1 text-sm text-red-500'>
								{errors.status.message}
							</p>
						)}
					</div>

					<div>
						<label className='mb-1 block text-sm font-medium text-gray-700'>
							Client
						</label>
						<select
							{...register('clientId')}
							className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400'
						>
							<option value=''>Select client</option>
							{clients.map((client) => (
								<option key={client.id} value={client.id}>
									{client.fullName} — {client.company}
								</option>
							))}
						</select>
						{errors.clientId && (
							<p className='mt-1 text-sm text-red-500'>
								{errors.clientId.message}
							</p>
						)}
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
							{isEditMode ? 'Save Changes' : 'Create Deal'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
