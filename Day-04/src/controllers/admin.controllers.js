import { Admin } from "../models/admin.models.js"


const signupAdmin = async (req, res) => {

    const { username, password } = req.body
        
    if (!username && !password) {
        return res
            .status(400)
            .json({
            message: "All fields are required"
        })
    }


    try {

        const existedAdmin = await Admin.findOne({ username: username })
        if (existedAdmin) {
            return res
                .status(409)
                .json({
                    message: "Admin already exist with usrname"
                })
        }
    
        const admin = await Admin.create({
            username,
            password
        })
    
        const createdAdmin = await Admin.findById(admin._id).select("-password")
        if (!createdAdmin) {
            return res
                .status(500)
                .json({
                    message: "Something went wrong while creating admin"
                })
        }
    
        return res
            .status(201)
            .json({
                data: createdAdmin,
                message: "Admin signup successfully"
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Something went wrong while registering Admin"
            })
    }
}

export { signupAdmin }