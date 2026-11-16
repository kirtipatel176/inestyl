const path = require("path");
const jiti = require("jiti")(path.join(__dirname, "run-auth-test.js"));
jiti(path.join(__dirname, "test-admin-auth.js"));
