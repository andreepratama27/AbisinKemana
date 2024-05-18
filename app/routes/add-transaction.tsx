import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
	Form,
	json,
	redirect,
	useActionData,
	useLoaderData,
} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "~/utils/constant";
import { supabaseClient } from "~/lib/supabase";

export async function loader() {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	const { data } = await supabase.from("categories").select();

	return json({ data });
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const title = String(formData.get("transaction"));
	const datetime = String(formData.get("datetime")) || new Date();
	const category = String(formData.get("category"));
	const amount = String(formData.get("amount"));

	const errors: Record<string, string> = {};

	if (!title.length) errors.transaction = "Transaksi harus diisi";
	if (!category.length) errors.category = "Harap pilih kategori";
	if (!amount) errors.amount = "Harap masukan jumlah (Rp)";

	if (Object.keys(errors).length) {
		return json({
			errors,
		});
	}

	await supabaseClient().from("transactions").insert({
		title,
		datetime,
		category,
	});

	return redirect("/");
}

export default function AddTransaction() {
	const data = useActionData<typeof action>();
	const categories = useLoaderData<typeof loader>();

	return (
		<div className="py-4">
			<Form method="post" className="space-y-4">
				<div className="form-group">
					<Label className="text-gray-500">Transaksi</Label>
					<Input name="transaction" placeholder="Tambah keterangan transaksi" />

					<div className="error-message text-sm text-red-500">
						{data?.errors?.transaction}
					</div>
				</div>

				<div className="form-group">
					<Label className="text-gray-500">Tanggal & Waktu</Label>
					<Input
						type="datetime-local"
						name="datetime"
						placeholder="Tambah keterangan transaksi"
						defaultValue={new Date().toISOString()}
					/>

					<div className="error-message text-sm text-red-500">
						{data?.errors?.datetime}
					</div>
				</div>

				<div className="form-group w-full max-w-full">
					<Label className="text-gray-500">Kategori</Label>

					<div className="box w-full overflow-hidden">
						<Select name="category">
							<SelectTrigger>
								<SelectValue placeholder="Pilih Kategori" />
							</SelectTrigger>
							<SelectContent className="w-full overflow-hidden">
								<SelectGroup>
									{categories.data?.map((cItem) => (
										<SelectItem value={cItem.name} key={cItem.id}>
											{cItem.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="error-message text-sm text-red-500">
						{data?.errors?.category}
					</div>
				</div>

				<div className="form-group">
					<Label className="text-gray-500">Jumlah</Label>
					<Input name="amount" placeholder="Tambah jumlah (Rp)" />

					<div className="error-message text-sm text-red-500">
						{data?.errors?.amount}
					</div>
				</div>

				<Button>Tambah Transaksi</Button>
			</Form>
		</div>
	);
}
