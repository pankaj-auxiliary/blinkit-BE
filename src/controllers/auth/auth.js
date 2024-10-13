import { Customer, DeliveryPartner } from "../../models/user.js";
import jwt, { decode } from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const LoginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });

      await customer.save();
    }
    const { accessToken, refreshToken } = generateTokens(customer);

    return reply.send({
      message: customer ? "Login Successful" : "Customer created amd Login",
      accessToken,
      refreshToken,
      customer,
    });
  } catch (err) {
    reply.status(500).send({ message: "An error occured", err });
  }
};

export const LoginDeliveryPartner = async (req, reply) => {
  try {
    const { email, password } = req.body;
    let deliveryPartner = await DeliveryPartner.findOne({ email });

    if (!deliveryPartner) {
      return reply.status(404).send({ message: "An error occured", err });
    }

    const isMatch = password === deliveryPartner.password;

    if (!isMatch) {
      return reply.status(400).send({ message: "Invalid credentials" });
    }

    // await deliveryPartner.save();

    const { accessToken, refreshToken } = generateTokens(deliveryPartner);

    return reply.send({
      message: "Login Successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (err) {
    reply.status(500).send({ message: "An error occured", err });
  }
};

export const refreshToken = async (req, reply) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return reply.status(401).send({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    let user;

    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decode.userId);
    } else {
      return reply.status(403).send({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    return reply.send({
      message: "Token Refreshed",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return reply.status(403).send({ message: "Invalid Refresh Token" });
  }
};

export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;
    let user;

    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decode.userId);
    } else {
      return reply.status(403).send({ message: "Invalid refresh token" });
    }

    if (!user) {
      return reply.status(404).send({ message: "user not found" });
    }
    return reply.send({
      message: "User fetched Successfully",
      user,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occured", error });
  }
};
