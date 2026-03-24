export type DealStatus = 'lead' | 'negotiation' | 'won' | 'lost';

export interface Deal {
	id: string;
	title: string;
	clientName: string;
	value: number;
	status: DealStatus;
	manager: string;
	createdAt: string;
}

export type DealsSortOption =
	| 'title-asc'
	| 'title-desc'
	| 'date-desc'
	| 'date-asc'
	| 'value-desc'
	| 'value-asc';
