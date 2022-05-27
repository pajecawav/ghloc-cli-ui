import { useState } from "preact/hooks";
import { Breadcrumb } from "./components/Breadcrumb";
import { FileTree } from "./components/FileTree";
import { LocsTree } from "./components/LocsTree";
import { Select } from "./components/Select";
import { SortOrder, useLocs } from "./hooks/useLocs";

export function App() {
	const [sortOrder, setSortOrder] = useState<SortOrder>("type");
	const [path, setPath] = useState<string[]>([]);
	const locs = useLocs(path, sortOrder);

	return (
		<div className="max-w-2xl mx-auto p-2 flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2">
				<Breadcrumb path={path} onChangeDir={path => setPath(path)} />

				<div className="ml-auto">
					<Select
						onChange={e =>
							setSortOrder(e.currentTarget.value as SortOrder)
						}
					>
						<option value="type">Type</option>
						<option value="locs">Locs</option>
					</Select>
				</div>
			</div>

			{!locs ? (
				<div className="mx-auto">Loading...</div>
			) : (
				<div className="grid grid-cols-1 gap-4 items-start sm:grid-cols-2">
					<FileTree
						locs={locs}
						onSelectDir={name => setPath(prev => [...prev, name])}
					/>
					<LocsTree locs={locs} />
				</div>
			)}
		</div>
	);
}
