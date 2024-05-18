import { createServerClient } from "@supabase/auth-helpers-remix";

export const createSupabaseServerClient = ({
	request,
	response,
}: { request: Request; response: Response }) =>
	createServerClient(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_PUBLIC_KEY as string,
		{ request, response },
	);
