import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event, context) => {
  return {
    body: JSON.stringify({ geo: context.clientContext }),
    statusCode: 200,
  }
}
