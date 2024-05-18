import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, json, useLoaderData, useNavigate } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import formatCurrency from "~/lib/formatCurrency";
import { supabaseClient } from "~/lib/supabase";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { data } = await supabaseClient()
		.from("transactions")
		.select()
		.eq("id", params.id)
		.single();

	return json({
		data,
	});
};

export default function Index() {
	const navigate = useNavigate();
	const { data } = useLoaderData<typeof loader>();

	return (
		<div className="space-y-2 py-4">
			<p className="font-semibold">{data.title}</p>
			<Badge>{data.category}</Badge>
			<p className="text-grey-500">{formatCurrency(data.amount)}</p>

			<div className="button-wrapper flex gap-4 pt-4">
				<Form action="destroy" method="POST">
					<Button type="submit" variant="destructive">
						Hapus
					</Button>
				</Form>

				<Button onClick={() => navigate("/")} variant="ghost">
					Batalkan
				</Button>
			</div>
		</div>
	);
}
