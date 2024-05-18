import type { MetaFunction } from "@remix-run/node";
import { BanIcon, PlusIcon } from "lucide-react";
import { Link, json, useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import formatCurrency from "~/lib/formatCurrency";
import { supabaseAnonKey, supabaseUrl } from "~/utils/constant";
import { id } from "date-fns/locale";

export const meta: MetaFunction = () => {
	return [
		{ title: "Abisin Kemana?" },
		{
			name: "Kemana uangmu kau habiskan?",
			content:
				"Jajan terus! Pengeluaran ga pernah di catat. Kan pusing jadinya",
		},
	];
};

export const loader = async () => {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	const { data } = await supabase
		.from("transactions")
		.select()
		.order("id", { ascending: false });

	return json({ data });
};

export default function Index() {
	const { data } = useLoaderData<typeof loader>();
	const navigate = useNavigate();

	const renderContent = () => {
		if (!data?.length)
			return (
				<div className="w-full h-20 flex items-center">
					<div className="box flex gap-2">
						<BanIcon className="text-red-500" />
						<p className="font-mono">Data tidak tersedia</p>
					</div>
				</div>
			);

		return (
			<div className="transaction-list py-4">
				<ul className="space-y-2">
					{data.map((transaction) => (
						<li
							className="flex justify-between items-center"
							key={transaction.id}
						>
							<div className="box">
								<Link to={`${transaction.id}`}>{transaction.title}</Link>
								<p className="text-gray-400 text-sm">
									{format(transaction.datetime, "dd MMM yyyy hh:mm", {
										locale: id,
									})}
								</p>
							</div>
							<div className="box">
								<p className="font-mono text-sm">
									{formatCurrency(transaction.amount)}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<main className="py-2">
			<div className="title w-full flex items-center justify-between border-b py-2 mt-2">
				<p className="font-bold">Semua Transaksi</p>
				<p className="text-sm text-gray-500">Lihat semua</p>
			</div>

			{renderContent()}

			<div className="content py-2">
				<Button onClick={() => navigate("/add-transaction")}>
					<PlusIcon size={14} /> &nbsp;Tambah Transaksi Baru
				</Button>
			</div>
		</main>
	);
}
