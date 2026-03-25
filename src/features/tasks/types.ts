export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: TaskPriority;
	dueDate: string;
	assignedTo: string;
	relatedTo?: string;
	createdAt: string;
};

export type TasksSortOption =
	| 'dueDate-asc'
	| 'dueDate-desc'
	| 'priority-desc'
	| 'priority-asc'
	| 'createdAt-desc'
	| 'createdAt-asc'
	| 'title-asc'
	| 'title-desc';
