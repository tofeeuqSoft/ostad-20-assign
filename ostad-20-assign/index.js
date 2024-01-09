const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.RUNNING_PORT || 3011;

app.listen(PORT, function () {
  console.log(`App is running at the port ${PORT}`);
});
