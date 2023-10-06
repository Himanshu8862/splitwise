import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
    try {

        await connectToDB();
        const userEmail = params.userEmail
        const friEmail = params.friEmail
        // console.log(userEmail,friEmail)
        if ((!userEmail) || (!friEmail)) {
            return new Response(JSON.stringify({ message: "Param not found" }), { status: 500 });
        }
        const user = await User.findOne({ email: userEmail })
        const fri = await User.findOne({ email: friEmail })
        // console.log("populate",user)

        if (user && fri) {
            const results = await Transaction.aggregate([
                { $match: { $or: [{sender: user._id, receiver : fri._id}, {sender: fri._id, receiver : user._id}] } },
                {$lookup:{ from: 'users', localField:'sender', foreignField:'_id', as:'senderUser'}},{$lookup:{ from: 'users', localField:'receiver', foreignField:'_id', as:'receiverUser'}}])

            return new Response(JSON.stringify({ listTransactions: results, message: "Sent list of transactions" }), { status: 201 });
        }
        else {
            return new Response(JSON.stringify({ message: "You are not registered" }), { status: 500 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while fetching transactions" }), { status: 500 })
    }
}