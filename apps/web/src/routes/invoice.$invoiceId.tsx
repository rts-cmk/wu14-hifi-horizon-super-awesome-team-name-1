import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/invoice/$invoiceId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const response = await fetch(`/api/orders/${params.invoiceId}`, {
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Invoice not found");
		}
		return await response.json();
	},
});

interface OrderItem {
	description: string;
	price: number;
	quantity: number;
	total: number;
}

interface Order {
	id: string;
	date: string;
	total: number;
	user: {
		fullName: string;
		address: string;
		country: string;
		phone: string;
		email: string;
	};
	items: OrderItem[];
}

function RouteComponent() {
	const order = useLoaderData({ from: "/invoice/$invoiceId" }) as Order;

	const vat = order.total * 0.2;
	const subtotal = order.total - vat - 4;

	return (
		<main className="bg-white py-10 px-12 md:py-16 md:px-20 max-w-5xl mx-auto font-sans text-gray-900 leading-normal shadow-sm my-10 border border-gray-100">
			<div className="flex justify-between items-start mb-6">
				<div className="space-y-4">
					<div className="space-y-0.5">
						<Text className="font-bold text-base">{order.user.fullName}</Text>
						<Text className="text-sm text-gray-600">{order.user.address}</Text>
						<Text className="text-sm text-gray-600">{order.user.country}</Text>
						<Text className="text-sm text-gray-600">P: {order.user.phone}</Text>
						<Text className="text-sm text-gray-600">M: {order.user.email}</Text>
					</div>
				</div>

				<div className="text-right">
					<div className="bg-black text-white p-3 mb-6 inline-block">
						<div className="font-bold text-[10px] tracking-tighter leading-none">
							HI
						</div>
						<div className="font-bold text-[10px] tracking-tighter leading-none">
							FI
						</div>
					</div>
					<div className="space-y-1">
						<Text className="font-bold text-sm">44 Cow Wynd, Falkirk</Text>
						<Text className="font-bold text-sm">Central Region, FK1 1PU</Text>
					</div>
					<div className="mt-4 text-sm text-gray-600 space-y-2">
						<div className="flex justify-end items-center gap-2">
							<span className="font-medium">0131 556 7901</span>
							<Phone className="size-4 text-gray-500" />
						</div>
						<div className="flex justify-end items-center gap-2">
							<span className="font-medium">sales@hifi-horizon.com</span>
							<Mail className="size-4 text-gray-500" />
						</div>
					</div>
				</div>
			</div>

			<div className="mb-10">
				<Text className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 block">
					Delivery Address
				</Text>
				<div className="space-y-0.5">
					<Text className="font-bold text-sm">{order.user.fullName}</Text>
					<Text className="text-sm text-gray-600">{order.user.address}</Text>
					<Text className="text-sm text-gray-600">{order.user.country}</Text>
					<Text className="text-sm text-gray-600">P: {order.user.phone}</Text>
					<Text className="text-sm text-gray-600">M: {order.user.email}</Text>
				</div>
			</div>

			<div className="flex justify-end mb-12">
				<div className="w-[380px] border-b border-gray-200 pb-6">
					<Heading
						variant="h1"
						className="text-4xl text-[#7A8BB1] font-medium mb-2"
					>
						Invoice
					</Heading>
					<div className="grid grid-cols-[140px_1fr] gap-y-3">
						<Text className="text-sm text-gray-500">Order number</Text>
						<div>
							<span className="bg-[#80BDFF]/40 text-[#0062CC] px-2 py-0.5 text-sm font-medium">
								{order.id}
							</span>
						</div>

						<Text className="text-sm text-gray-500">Date</Text>
						<Text className="text-sm text-gray-900">
							{order.date.toLowerCase()}
						</Text>

						<Text className="text-sm text-gray-500">Shop</Text>
						<Text className="text-sm text-gray-900">
							342 HIFI Horizon - Falkirk
						</Text>

						<Text className="text-sm text-gray-500">Currency</Text>
						<Text className="text-sm text-gray-900">GBP</Text>
					</div>
				</div>
			</div>

			<table className="w-full mb-16 border-collapse">
				<thead>
					<tr className="border-b border-gray-300">
						<th className="text-left py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
							Item Description
						</th>
						<th className="text-right py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
							Price
						</th>
						<th className="text-center py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
							Quantity
						</th>
						<th className="text-right py-4 px-2 pr-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
							Total
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{order.items.map((item, idx) => (
						<tr
							key={`${item.description}-${idx}`}
							className={idx % 2 === 1 ? "bg-[#EDEDED]/60" : ""}
						>
							<td className="py-5 px-2 text-gray-800 font-medium">
								{item.description}
							</td>
							<td className="py-5 px-2 text-right text-gray-800">
								{formatPrice(item.price)}
							</td>
							<td className="py-5 px-2 text-center text-gray-800">
								{item.quantity}
							</td>
							<td className="py-5 px-2 text-right font-medium text-gray-800 pr-4">
								{formatPrice(item.total)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex flex-col items-end gap-3 mb-20 pr-4">
				<div className="flex justify-between w-[280px]">
					<Text className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-600">
						Subtotal:
					</Text>
					<Text className="text-sm text-gray-900 font-medium">
						{formatPrice(subtotal)}
					</Text>
				</div>
				<div className="flex justify-between w-[280px]">
					<Text className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-600">
						Vat:
					</Text>
					<Text className="text-sm text-gray-900 font-medium">
						{formatPrice(vat)}
					</Text>
				</div>
				<div className="flex justify-between w-[280px]">
					<Text className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-600">
						Delivery:
					</Text>
					<Text className="text-sm text-gray-900 font-medium">
						{formatPrice(4)}
					</Text>
				</div>

				<div className="w-[380px] bg-[#424D5E] text-white p-5 mt-10 flex justify-between items-center shadow-lg rounded-none">
					<Text className="font-bold uppercase tracking-[0.3em] text-[11px] text-white/90">
						Total
					</Text>
					<Text className="text-2xl font-light tracking-tight text-white">
						{formatPrice(order.total)}
					</Text>
				</div>
			</div>

			<div className="pt-10 border-t border-gray-100 flex justify-center">
				<Text className="text-[11px] text-gray-500 whitespace-nowrap">
					<span className="font-bold text-gray-800">Address:</span> 44 Cow Wynd,
					Falkirk, Central Region, FK1 1PU |
					<span className="font-bold text-gray-800 ml-2">Phone:</span> 0131 556
					7901 |<span className="font-bold text-gray-800 ml-2">Mail:</span>{" "}
					sales@hifi-horizon.com
				</Text>
			</div>
		</main>
	);
}
