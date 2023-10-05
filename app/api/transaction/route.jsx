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