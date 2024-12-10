import { User } from "../models/user.models.js"



const signupUser = async  (req, res) => {
    
    const { username, password } = req.body
    if (!username && !password) {
        return res
            .status(400)
            .json({
                message: "All fields are required"
            })
    }

    try {
        
        const existedUser = await User.findOne({ username: username })
        if (existedUser) {
            return res
                .status(409)
                .json({
                    message: "User already exist with username"
                })
        }

        const user = await User.create({
            username,
            password
        })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            return res
                .status(500)
                .json({
                    message: "Something went wrong while creating User"
                })
        }

        return res
            .status(201)
            .json({
                data: createdUser,
                message: "user created successfully"
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Something went wrong while registering User"
            })
    }
} 


export {
    signupUser
}