import { useState } from "preact/hooks";
import { Breadcrumb } from "./components/Breadcrumb";
import { FileTree } from "./components/FileTree";
import { Input } from "./components/Input";
import { LocsTree } from "./components/LocsTree";
import { Select } from "./components/Select";
import { useDebounce } from "./hooks/useDebounce";
import { SortOrder, useLocs } from "./hooks/useLocs";

export function App() {
	const [sortOrder, setSortOrder] = useState<SortOrder>("type");
	const [filter, setFilter] = useState<string>("");
	const [debouncedFilter, setDebouncedFilter] = useState(filter);
	const [path, setPath] = useState<string[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
		null
	);
	const locs = useLocs(path, {
		sortOrder,
		filter: debouncedFilter || undefined,
	});

	useDebounce(() => setDebouncedFilter(filter), 750, [filter]);

	return (
		<div className="max-w-2xl mx-auto p-2 flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2">
				<Breadcrumb path={path} onChangeDir={path => setPath(path)} />

				<div className="ml-auto flex gap-2">
					<Select
						onChange={e =>
							setSortOrder(e.currentTarget.value as SortOrder)
						}
					>
						<option value="type">Type</option>
						<option value="locs">Locs</option>
					</Select>
					<Input
						className="w-40"
						size={1}
						placeholder="Filter"
						onInput={e => setFilter(e.currentTarget.value)}
					/>
				</div>
			</div>

			{!locs ? (
				<div className="mx-auto">Loading...</div>
			) : (
				<div className="grid grid-cols-1 gap-4 items-start sm:grid-cols-2">
					<FileTree
						locs={locs}
						selectedLanguage={selectedLanguage}
						onSelectDir={name => setPath(prev => [...prev, name])}
					/>
					<LocsTree
						locs={locs}
						selectedLanguage={selectedLanguage}
						onSelectLanguage={setSelectedLanguage}
					/>
				</div>
			)}
		</div>
	);
}
