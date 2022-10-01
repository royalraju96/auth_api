import UserModel from "../model/user.js";
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, mobile, tc } = req.body

        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ "status": "Failed", "message": "User already exists" })
        } else {
            if (name && email && password && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bycrypt.genSalt(10)
                        const hashPassoword = await bycrypt.hash(password, salt)
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: hashPassoword,
                            tc: tc
                        })
                        await doc.save()
                        res.send(
                            {'status' : "User created successfully","data":{name: name,
                                email: email,
                                mobile: mobile,
                                tc: tc}})
                    } catch (error) {
                        console.log(error)
                        res.send({"status": "failed", "message" : error})
                    }
                } else {
                    res.send({ "status": "Failed", "message": "Password and confirm password doesn't match" })
                }
            } else {
                res.send({ "status": "Failed", "message": "All fields are required" })
            }
        }
    }
}

export default UserController