import type { PropsWithChildren } from "react";

export function PageHeader({ children }: PropsWithChildren) {
	return (
		<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
			{children}
		</h1>
	);
}
