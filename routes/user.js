// const express = require("express");
import express from "express";
const router = express.Router();

import {
    buyerNotifications,
    buyerOrders,
    donateDrug,
    getBuyerNotification,
    getBuyerNotifications,
    getPharmaciesList,
    getUser,
    getUsers,
    login,
    signUpBuyer,
    signUpPharmacy,
    updateIsReadNotif,
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
router.get("/buyerOrders/:id", buyerOrders);
router.get("/buyer/donated-drug/:id", buyerNotifications);
router.get("/buyer/notifications", getBuyerNotifications);
router.get("/buyer/notification/:id", getBuyerNotification);
router.patch('/buyer/buyer-notif/:id', updateIsReadNotif);

export default router;