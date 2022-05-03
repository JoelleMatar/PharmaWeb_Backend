// const express = require("express");
import express from "express";
const router = express.Router();

import {
    getPharmaciesList,
    login,
    signUpBuyer,
    signUpPharmacy
} from "../controllers/userController";

router.post("/login", login);
router.post("/signup/buyer", signUpBuyer);
router.post("/signup/pharmacy", signUpPharmacy);
router.get("/pharmaciesList", getPharmaciesList);

export default router;