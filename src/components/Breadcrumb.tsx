import { Fragment } from "preact";

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
		<button
			className="text-blue-500 hover:underline disabled:text-inherit disabled:hover:no-underline"
			onClick={onClick}
			disabled={disabled}
		>
			{name}
		</button>
	);
}

export function Breadcrumb({ path, onChangeDir }: BreadcrumbProps) {
	function changeDir(index: number) {
		onChangeDir(path.slice(0, index));
	}

	return (
		<div className="flex gap-1">
			<BreadcrumbNode
				name="root"
				onClick={() => changeDir(0)}
				disabled={path.length === 0}
			/>

			{path.map((value, index) => (
				<Fragment key={index}>
					<span>/</span>
					<BreadcrumbNode
						name="value"
						onClick={() => changeDir(index + 1)}
						disabled={index === path.length - 1}
					/>
				</Fragment>
			))}
		</div>
	);
}
