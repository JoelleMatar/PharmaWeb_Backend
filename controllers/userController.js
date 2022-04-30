import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { loginValidation, signUpBuyerValidation, signUpPharmacyValidation } from "../middleware/YupValdiations.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const validation = { email, password }
    try {
      if (await loginValidation.validate(validation)) {
        const existingUser = await User.findOne({ email: email });
  
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

export const signUpBuyer = async (req, res) => {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;
    const validation = { firstName, lastName, email, password, role, phoneNumber };

    try {
        if (await signUpBuyerValidation.validate(validation)) {
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
                role: 0
            };

            User.create(newUser);

            const activateToken = jwt.sign({ firstName, lastName, email, password, phoneNumber }, 'activateAccount', { expiresIn: '20m' });

            return res.status(201).json({ result: newUser, activateToken, message: "User Created Successfully!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const signUpPharmacy = async (req, res) => {
  const { pharmacyName, city, email, password, role, phoneNumber, registrationYear, deliveryOptions, paymentOptions, pharmacyLicense } = req.body;
  const validation = { pharmacyName, city, email, password, role, phoneNumber, registrationYear, pharmacyLicense};
   
  try {
      if (await signUpPharmacyValidation.validate(validation)) {
          const exsistingUser = await User.findOne({ email });
          if (exsistingUser) return res.status(400).json({ message: "Pharmacy already exists" });

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = {
              pharmacyName: pharmacyName,
              city: city,
              email: email,
              password: hashedPassword,
              phoneNumber: phoneNumber,
              registrationYear: registrationYear,
              deliveryOptions: deliveryOptions,
              paymentOptions: paymentOptions,
              role: 1
          };

          User.create(newUser);

          const activateToken = jwt.sign({ pharmacyName, city, email, password, phoneNumber }, 'activateAccount', { expiresIn: '20m' });

          return res.status(201).json({ result: newUser, activateToken, message: "Pharmacy Created Successfully!" });
      }
  }
  catch (error) {
      res.status(500).json(error);
      console.log(error);
  }
}