import { z } from 'zod';

export const taskSchema = z.object({
	title: z
		.string()
		.min(3, 'Title must be at least 3 characters')
		.max(100, 'Title must be less than 100 characters'),
	description: z
		.string()
		.min(5, 'Description must be at least 5 characters')
		.max(300, 'Description must be less than 300 characters'),
	status: z.enum(['todo', 'in_progress', 'done']),
	priority: z.enum(['low', 'medium', 'high']),
	dueDate: z.string().min(1, 'Due date is required'),
	assignedTo: z
		.string()
		.min(2, 'Assigned user is required')
		.max(50, 'Assigned user is too long'),
	relatedTo: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
