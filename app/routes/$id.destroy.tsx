import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { supabaseClient } from "~/lib/supabase";

export const action = async ({ params }: ActionFunctionArgs) => {
	await supabaseClient()
		.from("transactions")
		.delete()
		.eq("id", Number(params.id));

	return redirect("/");
};
