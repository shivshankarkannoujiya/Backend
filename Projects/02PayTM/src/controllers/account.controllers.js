import { Account } from "../models/account.models.js";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
    const userId = req.user?._id;
    const account = await Account.findOne({ userId });

    return res.status(200).json({
        balance: account.balance,
    });
};

const transferBalance = async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;

        if (!amount || !to) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "amount and recipient account are required",
            });
        }

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid transfer amount",
            });
        }

        // Fetch the accounts within the transaction
        const account = await Account.findOne({
            userId: req.user?._id,
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance",
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(
            session
        );
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "recipient account not found",
            });
        }

        // Perform the Transaction
        await Account.updateOne(
            { userId: req.user?._id },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        // commit Transaction
        await session.commitTransaction();
        return res.status(200).json({
            message: "Transfer successful",
        });
    } catch (error) {
        console.log("Error during transfer : ", error);
        return res.status(500).json({
            message: "An error occured while processing the transfer",
        });
    }
};

export { getBalance, transferBalance };
