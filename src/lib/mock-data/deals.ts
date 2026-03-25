import { Deal } from '@/features/deals/types';

export const deals: Deal[] = [
	{
		id: '1',
		title: 'Website Redesign',
		value: 2500,
		status: 'new',
		clientId: '1',
		clientName: 'John Smith',
		createdAt: '2026-03-10',
	},
	{
		id: '2',
		title: 'CRM Integration',
		value: 4200,
		status: 'in_progress',
		clientId: '2',
		clientName: 'Emily Johnson',
		createdAt: '2026-03-12',
	},
	{
		id: '3',
		title: 'SEO Optimization',
		value: 1800,
		status: 'closed',
		clientId: '3',
		clientName: 'Michael Brown',
		createdAt: '2026-03-15',
	},
	{
		id: '4',
		title: 'Landing Page Development',
		value: 1200,
		status: 'lost',
		clientId: '4',
		clientName: 'Sarah Davis',
		createdAt: '2026-03-18',
	},
	{
		id: '5',
		title: 'Support Contract',
		value: 3200,
		status: 'in_progress',
		clientId: '5',
		clientName: 'David Wilson',
		createdAt: '2026-03-20',
	},
];
