export type DealStatus = 'new' | 'in_progress' | 'closed' | 'lost';

export type Deal = {
	id: string;
	title: string;
	value: number;
	status: DealStatus;
	clientName: string;
	createdAt: string;
};

export type DealsSortOption =
	| 'title-asc'
	| 'title-desc'
	| 'date-desc'
	| 'date-asc'
	| 'value-desc'
	| 'value-asc';
