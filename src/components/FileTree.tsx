import { useMemo } from "preact/hooks";
import { Locs } from "../types";
import { cn, getLocsValue } from "../utils";

interface FileTreeProps {
	locs: Locs;
}

function renderLoc(loc: number, total: number): string {
	return `${loc} (${((100 * loc) / total).toFixed(2)}%)`;
}

export function FileTree({ locs }: FileTreeProps) {
	const totalLocs = useMemo(
		() =>
			Object.values(locs.children ?? {}).reduce<number>(
				(sum: number, child) => sum + getLocsValue(child),
				0
			),
		[locs]
	);

	const entries = Object.entries(locs.children ?? {});

	return (
		<section>
			<h2 className="text-lg font-semibold mb-1">Files</h2>

			<ul
				className={cn(
					"rounded-lg border divide-y",
					entries.length === 0 && "h-40"
				)}
			>
				{entries.map(([name, child]) => (
					<li className="flex gap-2 px-2 py-1">
						<span className="truncate">{name}</span>
						<span className="ml-auto whitespace-nowrap">
							{renderLoc(getLocsValue(child), totalLocs)}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
