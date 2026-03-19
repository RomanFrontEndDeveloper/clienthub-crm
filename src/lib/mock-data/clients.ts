import { Client } from '@/features/clients/types';

export const clients: Client[] = [
	{
		id: '1',
		fullName: 'John Smith',
		email: 'john.smith@gmail.com',
		company: 'TechCorp',
		phone: '+1 234 567 890',
		status: 'active',
		source: 'Website',
		createdAt: '2024-01-10',
	},
	{
		id: '2',
		fullName: 'Anna Johnson',
		email: 'anna.johnson@gmail.com',
		company: 'DesignPro',
		phone: '+1 555 222 333',
		status: 'lead',
		source: 'LinkedIn',
		createdAt: '2024-02-12',
	},
	{
		id: '3',
		fullName: 'Michael Brown',
		email: 'michael.brown@gmail.com',
		company: 'SalesHub',
		phone: '+1 888 777 666',
		status: 'inactive',
		source: 'Referral',
		createdAt: '2024-03-05',
	},
];
