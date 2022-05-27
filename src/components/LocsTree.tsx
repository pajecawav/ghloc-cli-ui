import { Locs } from "../types";
import { cn } from "../utils";

interface LocsTreeProps {
	locs: Locs;
}

function renderLoc(loc: number, total: number): string {
	return `${loc} (${((100 * loc) / total).toFixed(2)}%)`;
}

export function LocsTree({ locs }: LocsTreeProps) {
	const totalLocs = Object.values(locs.locByLangs).reduce(
		(sum, loc) => sum + loc,
		0
	);

	const entries = Object.entries(locs.locByLangs);

	return (
		<section>
			<h2 className="text-lg font-semibold mb-1">
				Lines of code ({totalLocs})
			</h2>

			<ul
				className={cn(
					"rounded-lg border divide-y",
					entries.length === 0 && "h-40"
				)}
			>
				{entries.map(([name, loc]) => (
					<li className="flex gap-2 px-2 py-1">
						<span className="truncate">{name}</span>
						<span className="ml-auto whitespace-nowrap">
							{renderLoc(loc, totalLocs)}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
