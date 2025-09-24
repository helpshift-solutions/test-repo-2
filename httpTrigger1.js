const { app } = require("@azure/functions");
const { exec } = require("child_process");

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    // This is a common pattern for getting input from GET or POST requests
    const command = request.query.get("command") || (await request.text());

    if (command) {
      // BAD: The user's input is being executed directly by the OS.
      // An attacker could send a command like "ping 8.8.8.8; ls"
      // to execute an arbitrary command on the server.
      exec(command, (error, stdout, stderr) => {
        if (error) {
          context.log.error(`Execution error: ${error.message}`);
          return {
            status: 500,
            body: "An error occurred during command execution.",
          };
        }
        context.log(`stdout: ${stdout}`);
        context.log(`stderr: ${stderr}`);
      });

      return { body: `Executing command: ${command}` };
    }

    return {
      body: `Hello, world! Please provide a 'command' parameter in the query string or body.`,
    };
  },
});
