import { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema({
    name: {
        type: String,
        reqiured: true,
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
});

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;