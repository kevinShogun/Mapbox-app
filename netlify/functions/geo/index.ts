import { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
	// create a new response object
	try {
		return {
		  statusCode: 200,
		  body: JSON.stringify({geo: context.geo}),
		};
	  } catch (error) {
		return { statusCode: 500, body: error };
	  }

};

export const config: Config = {
	path: "/geo",
};
