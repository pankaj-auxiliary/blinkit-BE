import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";

const start = async () => {
  const app = Fastify();
  const PORT = process.env.PORT || 3000;

  await connectDB(process.env.MONGO_URI);
  await registerRoutes(app);
  await buildAdminRouter(app);

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.log("error : ", err);
    } else {
      console.log(
        `Blinkit clone started at : http://localhost:${PORT} ${admin.options.rootPath}`
      );
    }
  });
};

start();
