import { Breadcrumb } from "./components/Breadcrumb";
import { FileTree } from "./components/FileTree";
import { LocsTree } from "./components/LocsTree";
import { useLocs } from "./hooks/useLocs";

interface AppProps {
	path: string;
}

export function App({ path: pathname }: AppProps) {
	const locs = useLocs();

	const path = pathname.split("/");

	return (
		<div className="max-w-2xl mx-auto p-2 flex flex-col gap-2">
			<Breadcrumb path={path} />
			{!locs ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-1 gap-4 items-start sm:grid-cols-2">
					<FileTree locs={locs} />
					<LocsTree locs={locs} />
				</div>
			)}
		</div>
	);
}
