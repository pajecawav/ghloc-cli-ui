import { ComponentProps } from "preact";
import { ChevrownDownIcon } from "../icons/ChevronDownIcon";

export interface SelectProps
	extends Omit<ComponentProps<"select">, "className"> {}

export function Select(props: SelectProps) {
	return (
		<div className="relative w-max">
			<select
				className="pl-4 pr-8 py-1 rounded-md bg-transparent border appearance-none dark:border-neutral-700"
				{...props}
			/>
			<div className="absolute top-0 right-2 bottom-0 grid place-items-center">
				<ChevrownDownIcon />
			</div>
		</div>
	);
}
