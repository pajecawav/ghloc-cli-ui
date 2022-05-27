import { useEffect, useState } from "preact/hooks";
import { Locs } from "../types";

const GHLOC_URL_BASE = "http://localhost:8080";

export function useLocs() {
	const [locs, setLocs] = useState<Locs | null>(null);

	useEffect(() => {
		fetch(`${GHLOC_URL_BASE}/pajecawav/pockly/master`)
			.then(response => response.json())
			.then(json => setLocs(json));
	}, []);

	return locs;
}
