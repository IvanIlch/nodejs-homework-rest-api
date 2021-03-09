const app = require("../app");
const db = require("../db/index");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not started. Message: ${err.message}`);
});
