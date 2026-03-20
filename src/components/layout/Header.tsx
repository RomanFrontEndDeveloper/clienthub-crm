'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';

export function Header() {
	const dispatch = useAppDispatch();
	const userName = useAppSelector((state) => state.user.name);

	return (
		<header className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6'>
			<div className='flex items-center gap-3'>
				<button
					type='button'
					className='rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 lg:hidden'
					onClick={() => dispatch(toggleSidebar())}
				>
					Menu
				</button>

				<h1 className='text-lg font-semibold text-gray-800 sm:text-xl'>
					ClientHub CRM
				</h1>
			</div>

			<div className='rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700'>
				{userName}
			</div>
		</header>
	);
}
