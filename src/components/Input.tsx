import { ComponentProps } from "preact";

export type InputProps = Omit<ComponentProps<"input">, "className">;

export function Input(props: InputProps) {
	return <input className="border px-4 py-1 rounded-md w-40" {...props} />;
}
