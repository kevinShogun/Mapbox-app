import { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  
  return Response.json({
    geo: context.geo,
  });
};

export const config: Config = {
	path: "/geo",
};
