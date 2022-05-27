import { useMemo } from "preact/hooks";
import { DocumentIcon } from "../icons/DocumentIcon";
import { FolderIcon } from "../icons/FolderIcon";
import { Locs } from "../types";
import { cn, getLocsValue, isFolder } from "../utils";

interface FileTreeProps {
	locs: Locs;
	onSelectDir: (name: string) => void;
}

function renderLoc(loc: number, total: number): string {
	return `${loc} (${((100 * loc) / total).toFixed(2)}%)`;
}

function renderIcon(isFolder: boolean) {
	const Icon = isFolder ? FolderIcon : DocumentIcon;
	return <Icon className={cn("w-5 h-5", isFolder && "fill-blue-300")} />;
}

export function FileTree({ locs, onSelectDir }: FileTreeProps) {
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
					<li>
						<button
							onClick={() => onSelectDir(name)}
							className="w-full flex gap-2 items-center px-2 py-1 hover:bg-slate-100 disabled:bg-transparent"
							disabled={!isFolder(child)}
						>
							<span>{renderIcon(isFolder(child))}</span>
							<span className="truncate">{name}</span>
							<span className="ml-auto whitespace-nowrap">
								{renderLoc(getLocsValue(child), totalLocs)}
							</span>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
