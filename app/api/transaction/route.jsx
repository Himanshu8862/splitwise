import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { name, finalAmount, sender, receiver } = await req.json();

        const senderUser = await User.findOne({email: sender})
        const receiverUser = await User.findOne({email: receiver})
        console.log(senderUser)
        
        await Transaction.create({ name: name, amount: finalAmount, sender: senderUser._id, receiver: receiverUser._id });

        return new Response(JSON.stringify({ message: "Transaction created" }), { status: 201 });
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while creating transaction" }), { status: 500 })
    }
}

export const PUT = async (req) => {
    try {
        await connectToDB();

        const { id ,name, finalAmount, sender, receiver, senderUserId, receiverUserId } = await req.json();

        // const senderUser = await User.findOne({email: sender})
        // const receiverUser = await User.findOne({email: receiver})
        // console.log(senderUser)

        const txn = await Transaction.findById(id);

        txn.name = name;
        txn.amount = finalAmount;
        txn.sender = senderUserId;
        txn.receiver = receiverUserId;

        txn.save()
        
        // await Transaction.create({ name: name, amount: finalAmount, sender: senderUser._id, receiver: receiverUser._id });

        return new Response(JSON.stringify({ message: "Transaction updated" }), { status: 201 });
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while updating transaction" }), { status: 500 })
    }
}