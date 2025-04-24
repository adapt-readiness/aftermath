import type { ClientSchema } from "@aws-amplify/backend";
import { a, defineData } from "@aws-amplify/backend";
import { addUserToGroup } from "./add-user-to-group/resource";

const schema = a.schema({
  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.groups(["ADMINS"])])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),

  Article: a.model({
    title: a.string(),   // 🔥 Added fields
    content: a.string()
  }).authorization(allow => [
    allow.groups(["EDITORS"]).to(["read", "update"]),
    allow.groups(["ADMINS"]).to(["create", "read", "update", "delete"]),
    allow.owner().to(["read", "update", "delete"])
  ]),

  Todo: a.model({
    content: a.string(),
    isDone: a.boolean()
  }).authorization(allow => [
    allow.publicApiKey().to(["create"]),
    allow.owner().to(["read", "update", "delete"])
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
