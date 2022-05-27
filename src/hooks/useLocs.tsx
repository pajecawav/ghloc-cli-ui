import { useEffect, useMemo, useState } from "preact/hooks";
import { Locs } from "../types";
import { isFolder } from "../utils";

const GHLOC_URL_BASE = "http://localhost:8080";

const EMPTY_LOCS: Locs = { loc: 0, locByLangs: {} };

export function useLocs(path: string[]) {
	const [locs, setLocs] = useState<Locs | null>(null);

	useEffect(() => {
		fetch(`${GHLOC_URL_BASE}/pajecawav/pockly/master`)
			.then(response => response.json())
			.then(json => setLocs(json));
	}, []);

	const pathLocs = useMemo(() => {
		if (!locs) return locs;

		let pathLocs: Locs = locs;

		for (const dir of path) {
			if (!pathLocs.children || !(dir in pathLocs.children)) {
				return EMPTY_LOCS;
			}

			const child = pathLocs.children[dir];
			if (!isFolder(child)) {
				return EMPTY_LOCS;
			}

			pathLocs = child;
		}

		return pathLocs;
	}, [locs, path]);

	return pathLocs;
}
