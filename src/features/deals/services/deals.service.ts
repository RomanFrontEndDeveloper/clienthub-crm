import { deals } from '@/lib/mock-data/deals';
import { Deal } from '../types';

export async function getDeals(): Promise<Deal[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return deals;
}
