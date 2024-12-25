export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Response.json({
			message: 'Hello Ji',
		});
	},
} satisfies ExportedHandler<Env>;
