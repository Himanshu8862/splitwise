import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
    name: {
        type: String,
        reqiured: true,
    },
    amount: {
        type: Number,
        reqiured: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;