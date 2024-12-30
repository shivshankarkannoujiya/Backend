export default {
	async fetch(request: Request, env, ctx): Promise<Response> {
		return Response.json({
			message: 'You sent a get request',
		});
	},
} satisfies ExportedHandler<Env>;
