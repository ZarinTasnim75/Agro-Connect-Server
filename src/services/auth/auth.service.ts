import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "CUSTOMER" | "FARMER";
}

const register = async (data: RegisterData) => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role ?? "CUSTOMER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

const login = async (payload: LoginPayload) => {
  const { email, password } = payload;

  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // 2. Validate user existence and soft-delete status
  if (!user || user.isDeleted) {
    throw new Error("Invalid email or password");
  }

  // 3. Compare passwords
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  // 4. Generate JWT Access Token
  const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
  const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtSecret,
    { expiresIn: "7d" }
  );

  // 5. Exclude sensitive data before returning
  const { password: _, ...userWithoutPassword } = user;

  return {
    accessToken: token,
    user: userWithoutPassword,
  };
};

export default {
  register,
  login,
};