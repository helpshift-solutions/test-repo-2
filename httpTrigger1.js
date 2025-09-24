const { app } = require("@azure/functions");

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    // Minimal untrusted input: use environment variable (tainted by CodeQL)
    const userInput = process.env.USER_INPUT || "1+1";

    // BAD: eval of untrusted input
    const result = eval(userInput);

    return {
      body: `Result of eval: ${result}`,
    };
  },
});
