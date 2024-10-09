import express from 'express';
import { isLoggedIn, isAdmin, isStoreManager, isEmployee } from "../../middleware/isLog";

const router = express.Router();

router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
  res.send({ message: 'Hello, admin!' });
});

router.get('/storeManager', isLoggedIn, isStoreManager, (req, res) => {
  res.send({ message: 'Hello, store manager!' });
});

router.get('/employee', isLoggedIn, isEmployee, (req, res) => {
  res.send({ message: 'Hello, employee!' });
});

export default router;