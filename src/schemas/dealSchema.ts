import { z } from 'zod';

export const dealSchema = z.object({
	title: z
		.string()
		.min(3, 'Title must be at least 3 characters')
		.max(100, 'Title must be less than 100 characters'),
	value: z.coerce.number().min(1, 'Value must be greater than 0'),
	status: z.enum(['new', 'in_progress', 'closed', 'lost']),
	clientId: z.string().min(1, 'Client is required'),
});

export type DealFormValues = z.input<typeof dealSchema>;
export type DealFormOutput = z.output<typeof dealSchema>;
