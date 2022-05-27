import { useEffect, useRef } from "preact/hooks";

export function useDebounce(
	cb: () => void,
	ms: number | null,
	dependencies: any[]
) {
	const cbRef = useRef(cb);
	const timeoutIdRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		cbRef.current = cb;
	}, [cb]);

	useEffect(() => {
		clearTimeout(timeoutIdRef.current);
		timeoutIdRef.current = undefined;

		if (ms) {
			timeoutIdRef.current = setTimeout(() => cbRef.current(), ms);
			return () => clearTimeout(timeoutIdRef.current);
		}
	}, [...dependencies]);
}
