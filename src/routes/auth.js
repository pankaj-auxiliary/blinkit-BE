import {
  fetchUser,
  LoginCustomer,
  LoginDeliveryPartner,
  refreshToken,
} from "../controllers/auth/auth.js";
import { verifyToken } from "../middleware/auth.js";

export const authRoutes = async (fastify, options) => {
  fastify.post("/customer/login", LoginCustomer);
  fastify.post("/delivery/login", LoginDeliveryPartner);
  fastify.post("/refresh-token", refreshToken);
  fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
};
