import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const email = params.email;
        // console.log("email from param:", email);
        if (!email) {
            return new Response(JSON.stringify({ message: "Param not found" }), { status: 500 });
        }

        const user = await User.findOne({ email: email }).populate("groups")

        if (user) {
            // console.log("curruser", user);
            return new Response(JSON.stringify({ currUserID: user._id, listGroups: user.groups, message: "Sent list of groups" }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ message: "You are not registered" }), { status: 500 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 })
    }
}