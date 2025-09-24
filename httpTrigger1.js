const { app } = require("@azure/functions");

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    // Get user input
    const input = request.query.get("input") || (await request.text());

    if (input) {
      // BAD: Directly evaluating user-controlled input.
      // CodeQL should flag this as "Code injection".
      const result = eval(input);

      return { body: `Result of eval: ${result}` };
    }

    return {
      body: `Hello, world! Please provide an 'input' parameter in the query string or body.`,
    };
  },
});
