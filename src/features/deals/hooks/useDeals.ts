import { useQuery } from '@tanstack/react-query';
import { getDeals } from '../services/deals.service';

export function useDeals() {
	return useQuery({
		queryKey: ['deals'],
		queryFn: getDeals,
	});
}
