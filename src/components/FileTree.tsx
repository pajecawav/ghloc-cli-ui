import { Locs } from "../types";
import { cn } from "../utils";

interface FileTreeProps {
	locs: Locs;
}

export function FileTree({ locs }: FileTreeProps) {
	const entries = Object.entries(locs);

	return (
		<section>
			<h2 className="text-lg font-semibold mb-1">Files</h2>

			<ul
				className={cn(
					"rounded-lg border divide-y",
					entries.length === 0 && "h-40"
				)}
			></ul>
		</section>
	);
}
