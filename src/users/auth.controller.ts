import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userService from "./users.service";
import { ISeriealizedUser, IUser } from "./users.types";
import { generateToken } from "./auth.services";
import rolesService from "../roles/roles.service";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password);
  try {
    const existing = await userService.findBy({ username: newUser.username });
    if (existing) res.status(400).json({ message: "Username already exists." });

    const role = await rolesService.findByRole(newUser.role);
    if (!role) res.status(400).json({ message: `Role ${newUser.role} does not exist.` });
    delete newUser.role;
    newUser.role_id = role.id;
    const addedUser = await userService.insert(newUser);
    const { id, username, first_name, last_name, address, email } = addedUser;
    const serializedUser: ISeriealizedUser = {
      id,
      username,
      first_name,
      last_name,
      address,
      email,
      role: role,
    };
    const token = generateToken(serializedUser);
    res.status(201).json({ ...serializedUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Must Provide username and password" });
  }
  try {
    const user = await userService.findBy({ username });
    if (!user) {
      res.status(500).json({ message: "User does not exist" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const { id, first_name, last_name, address, email, role_id } = user;
      const role = await rolesService.findById(role_id);

      const serializedUser: ISeriealizedUser = {
        id,
        username,
        first_name,
        last_name,
        address,
        email,
        role: role,
      };
      const token = generateToken(serializedUser);
      res.status(200).json({ ...serializedUser, token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
