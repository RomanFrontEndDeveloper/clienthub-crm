import { useEffect, useState } from 'react';
import { Client, ClientStatus } from '../types';

type ClientFormValues = {
	fullName: string;
	email: string;
	company: string;
	status: ClientStatus;
	source: string;
};

type Props = {
	onClose: () => void;
	onSubmit: (client: Client) => void;
	initialData?: Client | null;
};

const defaultFormValues: ClientFormValues = {
	fullName: '',
	email: '',
	company: '',
	status: 'lead',
	source: '',
};

export function CreateClientModal({ onClose, onSubmit, initialData }: Props) {
	const [form, setForm] = useState<ClientFormValues>(defaultFormValues);

	const isEditMode = Boolean(initialData);

	useEffect(() => {
		if (initialData) {
			setForm({
				fullName: initialData.fullName,
				email: initialData.email,
				company: initialData.company,
				status: initialData.status,
				source: initialData.source,
			});
		} else {
			setForm(defaultFormValues);
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const client: Client = {
			id: initialData?.id || Date.now().toString(),
			fullName: form.fullName,
			email: form.email,
			company: form.company,
			status: form.status,
			source: form.source,
			phone: initialData?.phone || '',
			createdAt:
				initialData?.createdAt ||
				new Date().toISOString().split('T')[0],
		};

		onSubmit(client);
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
			<div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'>
				<h3 className='mb-4 text-lg font-semibold'>
					{isEditMode ? 'Edit Client' : 'Add Client'}
				</h3>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						name='fullName'
						placeholder='Full name'
						value={form.fullName}
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<input
						name='email'
						placeholder='Email'
						value={form.email}
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<input
						name='company'
						placeholder='Company'
						value={form.company}
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<select
						name='status'
						value={form.status}
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					>
						<option value='lead'>Lead</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>

					<input
						name='source'
						placeholder='Source'
						value={form.source}
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

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
