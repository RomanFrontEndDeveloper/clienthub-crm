'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseLocalStorageStateReturn<T> = {
	state: T;
	setState: Dispatch<SetStateAction<T>>;
	isHydrated: boolean;
};

export function useLocalStorageState<T>(
	key: string,
	initialValue: T,
): UseLocalStorageStateReturn<T> {
	const [state, setState] = useState<T>(initialValue);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		try {
			const storedValue = localStorage.getItem(key);

			if (storedValue !== null) {
				setState(JSON.parse(storedValue) as T);
			}
		} catch (error) {
			console.error(`Failed to read localStorage key "${key}"`, error);
		} finally {
			setIsHydrated(true);
		}
	}, [key]);

	useEffect(() => {
		if (!isHydrated) return;

		try {
			localStorage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error(`Failed to write localStorage key "${key}"`, error);
		}
	}, [key, state, isHydrated]);

	return { state, setState, isHydrated };
}
