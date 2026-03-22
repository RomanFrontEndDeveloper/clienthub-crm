import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormData } from '@/schemas/clientSchema';
import { Client } from '../types';

type Props = {
	onClose: () => void;
	onSubmit: (client: Client) => void;
	initialData?: Client | null;
};

export function CreateClientModal({ onClose, onSubmit, initialData }: Props) {
	const isEditMode = Boolean(initialData);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ClientFormData>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			fullName: '',
			email: '',
			company: '',
			status: 'lead',
			source: '',
		},
	});

	useEffect(() => {
		if (initialData) {
			reset({
				fullName: initialData.fullName,
				email: initialData.email,
				company: initialData.company,
				status: initialData.status,
				source: initialData.source,
			});
		} else {
			reset({
				fullName: '',
				email: '',
				company: '',
				status: 'lead',
				source: '',
			});
		}
	}, [initialData, reset]);

	const submitHandler = (formData: ClientFormData) => {
		const client: Client = {
			id: initialData?.id || Date.now().toString(),
			fullName: formData.fullName,
			email: formData.email,
			company: formData.company,
			status: formData.status,
			source: formData.source,
			phone: initialData?.phone || '',
			createdAt:
				initialData?.createdAt ||
				new Date().toISOString().split('T')[0],
		};

		onSubmit(client);
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
					{isEditMode ? 'Edit Client' : 'Add Client'}
				</h3>

				<form
					onSubmit={handleSubmit(submitHandler)}
					className='space-y-4'
				>
					<div>
						<input
							{...register('fullName')}
							placeholder='Full name'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.fullName && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.fullName.message}
							</p>
						)}
					</div>

					<div>
						<input
							{...register('email')}
							placeholder='Email'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.email && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<input
							{...register('company')}
							placeholder='Company'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.company && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.company.message}
							</p>
						)}
					</div>

					<div>
						<select
							{...register('status')}
							className='w-full rounded border px-3 py-2'
						>
							<option value='lead'>Lead</option>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>
						{errors.status && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.status.message}
							</p>
						)}
					</div>

					<div>
						<input
							{...register('source')}
							placeholder='Source'
							className='w-full rounded border px-3 py-2'
						/>
						{errors.source && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.source.message}
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
