import { clients } from '@/lib/mock-data/clients';
import { Client } from '../types';

export async function getClients(): Promise<Client[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return clients;
}
