import { Account } from "../models/account.models.js"


const getBalance = async (req, res) => {
    const userId = req.user?._id
    const account = await Account.findOne({ userId })
    
    return res
        .status(200)
        .json({
            balance: account.balance
        })
}


export { getBalance }