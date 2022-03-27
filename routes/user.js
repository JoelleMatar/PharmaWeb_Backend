// const express = require("express");
import express from "express";
const router = express.Router();

import {
    login,
    signUp
} from "../controllers/userController";

router.post("/login", login);
router.post("/signup", signUp);

export default router;