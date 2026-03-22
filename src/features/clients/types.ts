export type ClientStatus = 'active' | 'inactive' | 'lead';

export interface Client {
	id: string;
	fullName: string;
	email: string;
	company: string;
	phone: string;
	status: ClientStatus;
	source: string;
	createdAt: string;
}

export type ClientsSortOption =
	| 'name-asc'
	| 'name-desc'
	| 'date-desc'
	| 'date-asc';
