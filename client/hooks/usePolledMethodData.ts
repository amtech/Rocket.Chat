import { useEffect } from 'react';

import { AsyncState } from './useAsyncState';
import { useMethodData } from './useMethodData';

export const usePolledMethodData = <T>(methodName: string, args: any[] = [], intervalMs: number): AsyncState<T> & { reload: () => void } => {
	const { reload, ...state } = useMethodData<T>(methodName, args);

	useEffect(() => {
		const timer = setInterval(() => {
			reload();
		}, intervalMs);

		return (): void => {
			clearInterval(timer);
		};
	}, [reload, intervalMs]);

	return {
		...state,
		reload,
	};
};
