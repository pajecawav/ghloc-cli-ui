import { useState } from "preact/hooks";
import { Breadcrumb } from "./components/Breadcrumb";
import { FileTree } from "./components/FileTree";
import { LocsTree } from "./components/LocsTree";
import { useLocs } from "./hooks/useLocs";

export function App() {
	const [path, setPath] = useState<string[]>([]);
	const locs = useLocs(path);

	return (
		<div className="max-w-2xl mx-auto p-2 flex flex-col gap-2">
			<Breadcrumb path={path} onChangeDir={path => setPath(path)} />
			{!locs ? (
				<div>Loading...</div>
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
