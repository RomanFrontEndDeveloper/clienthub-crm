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
