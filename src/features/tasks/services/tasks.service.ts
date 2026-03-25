import { tasks } from '@/lib/mock-data/tasks';
import { Task } from '../types';

export async function getTasks(): Promise<Task[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return tasks;
}
