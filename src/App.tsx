import { useState } from "preact/hooks";
import { Breadcrumb } from "./components/Breadcrumb";
import { FileTree } from "./components/FileTree";
import { LocsTree } from "./components/LocsTree";
import { useLocs } from "./hooks/useLocs";

export function App() {
	const locs = useLocs();

	const [path, setPath] = useState<string[]>(["pajecawav", "pockly", "test"]);

	return (
		<div className="max-w-2xl mx-auto px-2 mt-2 flex flex-col gap-2">
			<Breadcrumb path={path} />
			{!locs ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
					<FileTree locs={locs} />
					<LocsTree locs={locs} />
				</div>
			)}
		</div>
	);
}
