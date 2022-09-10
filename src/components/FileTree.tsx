import { useMemo } from "preact/hooks";
import { DocumentIcon } from "../icons/DocumentIcon";
import { FolderIcon } from "../icons/FolderIcon";
import { Locs, LocsChild } from "../types";
import { cn, getLocsValue, isFolder } from "../utils";

interface FileTreeProps {
	locs: Locs;
	onSelectDir: (name: string) => void;
	selectedLanguage: string | null;
}

function renderLoc(loc: number, total: number): string {
	return `${loc} (${((100 * loc) / total).toFixed(2)}%)`;
}

function renderIcon(isFolder: boolean) {
	const Icon = isFolder ? FolderIcon : DocumentIcon;
	return (
		<Icon
			className={cn(
				"w-5 h-5 dark:text-neutral-400",
				isFolder && "fill-blue-300"
			)}
		/>
	);
}

function getStyleForSelectedLanguage(percentage: number) {
	return {
		backgroundSize: `${percentage}%`,
	};
}

export function FileTree({
	locs,
	onSelectDir,
	selectedLanguage,
}: FileTreeProps) {
	const totalLocs = useMemo(
		() =>
			Object.values(locs.children ?? {}).reduce<number>(
				(sum: number, child) => sum + getLocsValue(child),
				0
			),
		[locs]
	);

	const totalLocsOfSelectedLanguage = selectedLanguage
		? locs.locByLangs[selectedLanguage] || 0
		: 0;
	const getLocsPercentageOfSelectedLanguage = (
		name: string,
		node: LocsChild
	) => {
		if (!selectedLanguage || !totalLocsOfSelectedLanguage) return 0;

		if (!isFolder(node)) {
			return name.endsWith(selectedLanguage)
				? (node / totalLocsOfSelectedLanguage) * 100
				: 0;
		}
		return (
			(node.locByLangs[selectedLanguage] / totalLocsOfSelectedLanguage) *
				100 || 0
		);
	};

	const entries = Object.entries(locs.children ?? {});

	return (
		<section>
			<h2 className="text-lg font-semibold mb-1">Files</h2>

			<ul
				className={cn(
					"rounded-lg border divide-y dark:border-neutral-700 dark:divide-neutral-700",
					entries.length === 0 && "h-40"
				)}
			>
				{entries.map(([name, child]) => (
					<li
						className="bg-gradient-to-r from-sky-100 to-sky-100 bg-no-repeat transition-[background-size] duration-[0.4s] dark:from-sky-100/10 dark:to-sky-100/10"
						style={getStyleForSelectedLanguage(
							getLocsPercentageOfSelectedLanguage(name, child)
						)}
						key={name}
					>
						<button
							onClick={() => onSelectDir(name)}
							className="w-full flex gap-2 items-center px-2 py-1 hover:bg-sky-100 disabled:bg-transparent dark:hover:bg-sky-100/10"
							disabled={!isFolder(child)}
							title={name}
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
