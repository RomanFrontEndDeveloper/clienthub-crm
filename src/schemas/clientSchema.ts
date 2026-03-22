import { z } from 'zod';

export const clientSchema = z.object({
	fullName: z.string().min(2, 'Full name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	company: z.string().min(2, 'Company name must be at least 2 characters'),
	status: z.enum(['active', 'inactive', 'lead']),
	source: z.string().min(2, 'Source must be at least 2 characters'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
