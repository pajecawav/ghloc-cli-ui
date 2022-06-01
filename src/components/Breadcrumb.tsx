export interface BreadcrumbProps {
	path: string[];
	onChangeDir: (path: string[]) => void;
}

interface BreadcrumbNodeProps {
	name: string;
	onClick?: () => void;
	disabled?: boolean;
}

function BreadcrumbNode({ name, onClick, disabled }: BreadcrumbNodeProps) {
	return (
		<li className="inline before:content-['/'] before:mx-1.5 before:text-gray-500 first:before:hidden">
			<button
				className="text-blue-500 hover:underline disabled:text-inherit disabled:hover:no-underline dark:text-blue-400"
				onClick={onClick}
				disabled={disabled}
			>
				{name}
			</button>
		</li>
	);
}

export function Breadcrumb({ path, onChangeDir }: BreadcrumbProps) {
	function changeDir(index: number) {
		onChangeDir(path.slice(0, index));
	}

	path = ["root", ...path];

	return (
		<ul className="break-all">
			{path.map((value, index) => (
				<BreadcrumbNode
					name={value}
					onClick={() => changeDir(index)}
					disabled={index === path.length - 1}
					key={index}
				/>
			))}
		</ul>
	);
}
