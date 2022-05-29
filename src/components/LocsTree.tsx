import { Locs } from "../types";
import { cn } from "../utils";

interface LocsTreeProps {
	locs: Locs;
	selectedLanguage: string | null;
	onSelectLanguage: (lang: string | null) => void;
}

function renderLoc(loc: number, total: number): string {
	return `${loc} (${((100 * loc) / total).toFixed(2)}%)`;
}

export function LocsTree({
	locs,
	selectedLanguage,
	onSelectLanguage,
}: LocsTreeProps) {
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
					"rounded-lg border divide-y dark:border-neutral-700 dark:divide-neutral-700",
					entries.length === 0 && "h-40"
				)}
			>
				{entries.map(([name, loc]) => (
					<li>
						<button
							className={cn(
								"w-full flex gap-2 px-2 py-1 hover:bg-sky-100 dark:hover:bg-sky-100/10",
								selectedLanguage === name &&
									"bg-sky-100 dark:bg-sky-100/10"
							)}
							onClick={() =>
								onSelectLanguage(
									selectedLanguage === name ? null : name
								)
							}
						>
							<span className="truncate">{name}</span>
							<span className="ml-auto whitespace-nowrap">
								{renderLoc(loc, totalLocs)}
							</span>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
