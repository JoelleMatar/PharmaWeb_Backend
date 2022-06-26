// const express = require("express");
import express from "express";
const router = express.Router();

import {
    donateDrug,
    getPharmaciesList,
    getUser,
    getUsers,
    login,
    signUpBuyer,
    signUpPharmacy,
    updatePharmacy
} from "../controllers/userController";

router.post("/login", login);
router.post("/signup/buyer", signUpBuyer);
router.post("/signup/pharmacy", signUpPharmacy);
router.get("/pharmaciesList", getPharmaciesList);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/donate-drug", donateDrug);
router.patch("/updatePharmacy/:id", updatePharmacy);

export default router;