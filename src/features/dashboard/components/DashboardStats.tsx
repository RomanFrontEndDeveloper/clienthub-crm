import { Client } from '@/features/clients/types';
import { Deal } from '@/features/deals/types';
import { Task } from '@/features/tasks/types';
import { StatCard } from './StatCard';

type Props = {
	clients: Client[];
	deals: Deal[];
	tasks: Task[];
};

function isTaskOverdue(task: Task) {
	if (task.status === 'done') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDate = new Date(task.dueDate);
	dueDate.setHours(0, 0, 0, 0);

	return dueDate < today;
}

export function DashboardStats({ clients, deals, tasks }: Props) {
	const totalClients = clients.length;

	const activeDeals = deals.filter(
		(deal) => deal.status === 'new' || deal.status === 'in_progress',
	).length;

	const overdueTasks = tasks.filter(isTaskOverdue).length;

	const completedTasks = tasks.filter(
		(task) => task.status === 'done',
	).length;

	return (
		<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
			<StatCard
				title='Total Clients'
				value={totalClients}
				description='All clients in your CRM'
			/>

			<StatCard
				title='Active Deals'
				value={activeDeals}
				description='New and in-progress deals'
			/>

			<StatCard
				title='Overdue Tasks'
				value={overdueTasks}
				description='Tasks past their due date'
			/>

			<StatCard
				title='Completed Tasks'
				value={completedTasks}
				description='Tasks marked as done'
			/>
		</div>
	);
}
