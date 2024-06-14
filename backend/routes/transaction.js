const express = require("express");
const transactionRouter = express.Router();
const { Account } = require("../db");
const zod = require("zod");
const { authmiddleware } = require("../middleware");
const mongoose = require("mongoose");

transactionRouter.post("/send", authmiddleware, async function (req, res) {

    const session = await mongoose.startSession();
    session.startTransaction();

    const transactionDetails = req.body;

   
    const transactionSchema = zod.object({
        userName: zod.string(),
        recieverId: zod.string(),
        amount: zod.number(),
    });


    const { success } = transactionSchema.safeParse(req.body);

    if (!success) {
        await session.abortTransaction();
        session.endSession();
        res.status(401).json("Invalid Input");
        return;
    }

    try {
        const { userName: senderId, recieverId, amount } = transactionDetails;

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", recieverId);
        console.log("Amount:", amount);

   
        const senderAccount = await Account.findOne({ userId: senderId }).session(session);
        const receiverAccount = await Account.findOne({ userId: recieverId }).session(session);

        console.log("Sender Account:", senderAccount);
        console.log("Receiver Account:", receiverAccount);

        if (!senderAccount || !receiverAccount) {
            throw new Error("Sender or Receiver not found");
        }


        if (senderAccount.balance < amount) {
            throw new Error("Insufficient funds");
        }

        const senderUpdate = await Account.updateOne(
            { userId: senderId },
            { $inc: { balance: -amount } }
        ).session(session);

        const receiverUpdate = await Account.updateOne(
            { userId: recieverId },
            { $inc: { balance: amount } }
        ).session(session);

        console.log("Sender Update:", senderUpdate);
        console.log("Receiver Update:", receiverUpdate);

        await session.commitTransaction();
        session.endSession();

        res.json("Transaction successfully completed");
    } catch (err) {

        await session.abortTransaction();
        session.endSession();
        console.error("Transaction failed:", err.message);
        res.status(500).json("Could not complete the transaction");
    }
});

module.exports = transactionRouter;
