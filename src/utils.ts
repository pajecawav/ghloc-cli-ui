import { LocsChild } from "./types";

export function cn(...values: unknown[]): string {
	return values.filter(v => typeof v === "string").join(" ");
}

export function getLocsValue(child: LocsChild): number {
	return typeof child === "number" ? child : child.loc;
}
