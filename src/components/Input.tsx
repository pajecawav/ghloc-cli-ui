import { ComponentProps } from "preact";
import { cn } from "../utils";

export type InputProps = ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			className={cn(
				"px-4 py-1 rounded-md bg-transparent border dark:border-neutral-700",
				className
			)}
			{...props}
		/>
	);
}
