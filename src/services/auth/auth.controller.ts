import type { Request, Response } from "express";
import authService from "./auth.service.js";

const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export default {
  register,
  login,
};