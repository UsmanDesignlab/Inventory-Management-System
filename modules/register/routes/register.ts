import express from "express";
import { userProfile, changePassword, loginRegister, userRegister, userLogout } from "../../register/controller/register";

const router = express.Router({ mergeParams: true });

router.post("/register", userRegister)
router.post("/logout", userLogout)
router.post("/login", loginRegister)
router.post("/changePassword", changePassword)
router.get("/profile", userProfile)


export default router;

