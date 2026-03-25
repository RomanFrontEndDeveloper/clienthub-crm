import { z } from 'zod';

export const dealSchema = z.object({
	title: z.string().min(2, 'Title must be at least 2 characters'),
	clientName: z.string().min(2, 'Client name must be at least 2 characters'),
	value: z.coerce.number().positive('Value must be greater than 0'),
	status: z.enum(['lead', 'negotiation', 'won', 'lost']),
	manager: z.string().min(2, 'Manager name must be at least 2 characters'),
});

export type DealFormData = z.infer<typeof dealSchema>;
