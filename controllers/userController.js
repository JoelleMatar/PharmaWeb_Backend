import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { loginValidation, signUpValidation } from "../middleware/YupValdiations.js";

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    const validation = { email, password, role }
    try {
      if (await loginValidation.validate(validation)) {
        const existingUser = await User.findOne({ email: email, role: role });
  
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
  
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: "24h" });
  
        res.status(200).json({ result: existingUser, token, message: "User Logged In Successfully!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
};

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, role, phoneNumber } = req.body;
    const validation = { firstName, lastName, email, password, confirmPassword, role, phoneNumber };

    try {
        if (await signUpValidation.validate(validation)) {
            const exsistingUser = await User.findOne({ email });
            if (exsistingUser) return res.status(400).json({ message: "User already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                role: role
            };

            User.create(newUser);

            const activateToken = jwt.sign({ firstName, lastName, email, password, phoneNumber }, 'activateAccount', { expiresIn: '20m' });

            return res.status(201).json({ result: true, activateToken, message: "User Created Successfully!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

}