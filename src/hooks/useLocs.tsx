import { useEffect, useMemo, useState } from "preact/hooks";
import { Locs, LocsChild } from "../types";
import { isFolder } from "../utils";

export type SortOrder = "type" | "locs";

const GHLOC_URL_BASE = "http://localhost:8080";

const EMPTY_LOCS: Locs = { loc: 0, locByLangs: {} };

export interface UseLocsOptions {
	sortOrder?: SortOrder;
	filter?: string;
}

export function useLocs(
	path: string[],
	{ sortOrder = "type", filter }: UseLocsOptions
) {
	const [locs, setLocs] = useState<Locs | null>(null);

	useEffect(() => {
		// TODO: abort fetch
		const url = new window.URL(`${GHLOC_URL_BASE}/pajecawav/pockly/master`);
		if (filter) url.searchParams.append("match", filter);

		fetch(url.toString())
			.then(response => response.json())
			.then(json => setLocs(json));
	}, [filter]);

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

	const sortedLocs = useMemo((): Locs | null => {
		if (!pathLocs) return pathLocs;

		const children = pathLocs.children;
		if (!children) {
			return pathLocs;
		}

		if (sortOrder === "locs") {
			return pathLocs;
		}

		const names = Object.keys(children);

		names.sort((nameA, nameB) => {
			const a = children[nameA] as Locs;
			const b = children[nameB] as Locs;

			const isFolderA = isFolder(a);
			const isFolderB = isFolder(b);

			if (isFolderA !== isFolderB) {
				return Number(isFolderB) - Number(isFolderA);
			}

			return nameA < nameB ? -1 : 1;
		});

		const sortedChildren: Record<string, LocsChild> = {};
		for (const name of names) {
			sortedChildren[name] = children[name];
		}

		return { ...pathLocs, children: sortedChildren };
	}, [pathLocs, sortOrder]);

	return sortedLocs;
}
