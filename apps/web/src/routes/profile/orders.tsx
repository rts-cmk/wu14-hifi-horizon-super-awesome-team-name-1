import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Heading, Text } from "@/components/ui/typography";

interface Order {
	id: string;
	date: string;
	total: number;
	itemsCount: number;
}

const ordersQueryOptions = queryOptions({
	queryKey: ["orders"],
	queryFn: async () => {
		const response = await fetch("/api/me/orders", { credentials: "include" });
		if (!response.ok) return [] as Order[];
		return (await response.json()) as Order[];
	},
});

export const Route = createFileRoute("/profile/orders")({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(ordersQueryOptions);
	},
});

function OrderItem({
	id,
	date,
	total,
	itemsCount,
}: {
	id: string;
	date: string;
	total: number;
	itemsCount: number;
}) {
	return (
		<div className="flex items-center justify-between py-8 first:pt-0 last:pb-0">
			<div className="space-y-1">
				<div className="flex gap-2">
					<Text className="font-bold text-black">Ordernumber:</Text>
					<Text className="text-gray-600">{id}</Text>
				</div>
				<div className="flex gap-2">
					<Text className="font-bold text-black">Date:</Text>
					<Text className="text-gray-600">{date}</Text>
				</div>
				<div className="flex gap-2">
					<Text className="font-bold text-black">Total:</Text>
					<Text className="text-gray-600">
						£{" "}
						{total
							.toLocaleString("en-GB", {
								minimumFractionDigits: 2,
								useGrouping: true,
							})
							.replace(".", ",")}
					</Text>
				</div>
				<div className="flex gap-2">
					<Text className="font-bold text-black">items:</Text>
					<Text className="text-gray-600">{itemsCount}</Text>
				</div>
			</div>
			<Link to="/invoice/$invoiceId" params={{ invoiceId: id }}>
				<Button
					variant="outline"
					size="icon"
					className="size-10 rounded-sm border-gray-200 shadow-sm"
				>
					<FileText className="size-4 text-gray-600" />
				</Button>
			</Link>
		</div>
	);
}

function RouteComponent() {
	const navigate = useNavigate();
	const { data: orders } = useSuspenseQuery(ordersQueryOptions);

	const tabs = [
		{ id: "profile", label: "Profile" },
		{ id: "orders", label: "Orders" },
	];

	const handleTabChange = (id: string) => {
		if (id === "profile") {
			navigate({ to: "/profile" });
		}
	};

	return (
		<main className="min-h-screen w-full bg-[#E8E8E8]/30 px-4 md:px-8 py-12 md:py-24">
			<div className="max-w-6xl mx-auto bg-white border border-gray-100 shadow-sm overflow-hidden">
				<Tabs
					tabs={tabs}
					activeTab="orders"
					onTabChange={handleTabChange}
					variant="pills"
				/>

				<div className="p-8 md:p-12">
					<Heading
						variant="h2"
						className="text-lg font-bold uppercase tracking-wider"
					>
						Your Recent Orders
					</Heading>

					{orders && orders.length > 0 ? (
						<div className="divide-y divide-gray-100">
							{orders.map((order: Order) => (
								<OrderItem
									key={order.id}
									id={order.id}
									date={order.date}
									total={order.total}
									itemsCount={order.itemsCount}
								/>
							))}
						</div>
					) : (
						<div>
							<Text className="text-gray-500">You have no orders.</Text>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
