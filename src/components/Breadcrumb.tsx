import { Fragment } from "preact";

export interface BreadcrumbProps {
	path: string[];
}

export function Breadcrumb({ path }: BreadcrumbProps) {
	return (
		<div className="flex gap-1">
			{path.map((value, index) => (
				<Fragment key={index}>
					{index !== 0 && <span>/</span>}
					<span>{value}</span>
				</Fragment>
			))}
		</div>
	);
}
