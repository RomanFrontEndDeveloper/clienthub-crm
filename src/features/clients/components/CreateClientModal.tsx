import { useState } from 'react';
import { Client, ClientStatus } from '../types';

type CreateClientInput = Omit<Client, 'id' | 'phone' | 'createdAt'>;

type Props = {
	onClose: () => void;
	onCreate: (client: Client) => void;
};

export function CreateClientModal({ onClose, onCreate }: Props) {
	const [form, setForm] = useState<CreateClientInput>({
		fullName: '',
		email: '',
		company: '',
		status: 'lead' as ClientStatus,
		source: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onCreate({
			...form,
			id: Date.now().toString(),
			phone: '',
			createdAt: new Date().toISOString().split('T')[0],
		});

		onClose();
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/40'>
			<div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'>
				<h3 className='mb-4 text-lg font-semibold'>Add Client</h3>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						name='fullName'
						placeholder='Full name'
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<input
						name='email'
						placeholder='Email'
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<input
						name='company'
						placeholder='Company'
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
					/>

					<select
						name='status'
						onChange={handleChange}
						className='w-full rounded border px-3 py-2'
						value={form.status}
					>
						<option value='lead'>Lead</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>

					<input
						name='source'
						placeholder='Source'
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
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
