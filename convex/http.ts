import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";

const http = httpRouter();

export const doSomething = httpAction(async (ctx, request) => {
  const {data, type} = await request.json();
  switch (type) {
    case 'user.created':
        await ctx.runMutation(internal.users.createUser, {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            first_name: data.first_name,
            last_name: data.last_name,
            imageUrl: data.image_url,
            username: data.username,
        })
        break;
    case 'user.updated':
        console.log('User updated:', data);
        break;
  }
  return new Response(null, {status: 200});
});

http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: doSomething,
  });

//https://fine-ox-237.convex.site/clerk-users-webhook

export default http;