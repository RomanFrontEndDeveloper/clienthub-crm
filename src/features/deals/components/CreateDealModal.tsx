import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dealSchema, DealFormData } from '@/schemas/dealSchema';
import { Deal } from '../types';

type Props = {
	onClose: () => void;
	onSubmit: (deal: Deal) => void;
	initialData?: Deal | null;
};
// m
export function CreateDealModal({ onClose, onSubmit, initialData }: Props) {
	const isEditMode = Boolean(initialData);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DealFormData>({
		resolver: zodResolver(dealSchema),
		defaultValues: {
			title: '',
			clientName: '',
			value: 0,
			status: 'lead',
			manager: 'Roman',
		},
	});

	useEffect(() => {
		if (initialData) {
			reset({
				title: initialData.title,
				clientName: initialData.clientName,
				value: initialData.value,
				status: initialData.status,
				manager: initialData.manager,
			});
		} else {
			reset({
				title: '',
				clientName: '',
				value: 0,
				status: 'lead',
				manager: 'Roman',
			});
		}
	}, [initialData, reset]);

	const submitHandler = (formData: DealFormData) => {
		const deal: Deal = {
			id: initialData?.id || Date.now().toString(),
			title: formData.title,
			clientName: formData.clientName,
			value: formData.value,
			status: formData.status,
			manager: formData.manager,
			createdAt:
				initialData?.createdAt ||
				new Date().toISOString().split('T')[0],
		};

		onSubmit(deal);
		onClose();
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
			onClick={onClose}
		>
			<div
				className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className='mb-4 text-lg font-semibold'>
					{isEditMode ? 'Edit Deal' : 'Add Deal'}
				</h3>

				<form
					onSubmit={handleSubmit(submitHandler)}
					className='space-y-4'
				>
					<div>
						<input
							{...register('title')}
							placeholder='Deal title'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.title && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.title.message}
							</p>
						)}
					</div>

					<div>
						<input
							{...register('clientName')}
							placeholder='Client name'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.clientName && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.clientName.message}
							</p>
						)}
					</div>

					<div>
						<input
							type='number'
							{...register('value', { valueAsNumber: true })}
							placeholder='Deal value'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.value && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.value.message}
							</p>
						)}
					</div>

					<div>
						<select
							{...register('status')}
							className='w-full rounded border px-3 py-2'
						>
							<option value='lead'>Lead</option>
							<option value='negotiation'>Negotiation</option>
							<option value='won'>Won</option>
							<option value='lost'>Lost</option>
						</select>
						{errors.status && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.status.message}
							</p>
						)}
					</div>

					<div>
						<input
							{...register('manager')}
							placeholder='Manager'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.manager && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.manager.message}
							</p>
						)}
					</div>

					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-sm'
						>
							Cancel
						</button>

						<button
							type='submit'
							className='rounded bg-black px-4 py-2 text-sm text-white'
						>
							{isEditMode ? 'Save Changes' : 'Create'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
