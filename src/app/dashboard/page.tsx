'use client';

import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { RecentTasks } from '@/features/dashboard/components/RecentTasks';
import { Client } from '@/features/clients/types';
import { Deal } from '@/features/deals/types';
import { Task } from '@/features/tasks/types';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

export default function DashboardPage() {
	const { state: clients } = useLocalStorageState<Client[]>(
		'crm-clients',
		[],
	);
	const { state: deals } = useLocalStorageState<Deal[]>('crm-deals', []);
	const { state: tasks } = useLocalStorageState<Task[]>('crm-tasks', []);

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
				<p className='mt-1 text-sm text-gray-500'>
					Welcome to ClientHub CRM dashboard.
				</p>
			</div>

			<DashboardStats clients={clients} deals={deals} tasks={tasks} />

			<RecentTasks tasks={tasks} />
		</div>
	);
}
