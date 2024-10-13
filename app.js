import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();
  await buildAdminRouter(app);
  const PORT = process.env.PORT || 3000;

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.log("error : ", err);
    } else {
      console.log(`Blinkit clone started at : http://localhost:${PORT} ${admin.options.rootPath}`);
    }
  });
};

start();
