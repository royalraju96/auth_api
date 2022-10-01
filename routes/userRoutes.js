import express from "express"

const router = express.Router()
import UserController from "../controllers/UserController.js"

//Public Routes

router.post('/register', UserController.userRegistration)
//Protected Routes


export default router