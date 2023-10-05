import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const PUT = async (req, { params }) => {
    try {
        await connectToDB();

        const { email } = await req.json();
        const userEmail = params.email

        // console.log(email, userEmail)

        const currUser = await User.findOne({ email: userEmail })

        if (currUser) {
            // console.log("curruser", currUser);
            const userExists = await User.findOne({ email: email })

            if (!userExists) {
                return new Response(JSON.stringify({ message: "Email doesnt exist" }), { status: 500 });
            }
            // console.log("userExists: ", userExists);
            if (currUser.friends.includes(userExists._id)) {
                return new Response(JSON.stringify({ message: "Friend already exists" }), { status: 200 });
            }
            currUser.friends.push(userExists._id)
            currUser.save()
            userExists.friends.push(currUser._id)
            userExists.save()
            // console.log(currUser);
            // console.log(userExists);
            return new Response(JSON.stringify({ message: "Added friend" }), { status: 201 });
        }
        else {
            return new Response(JSON.stringify({ message: "You are not registered" }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while adding friend" }), { status: 500 })
    }
}

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const email = params.email
        if (!email) {
            return new Response(JSON.stringify({ message: "Param not found" }), { status: 500 });
        }
        const user = await User.findOne({ email: email }).populate("friends")
        // console.log("populate",user)

        if (user) {
            // console.log("curruser", user);
            return new Response(JSON.stringify({ currUserID: user._id, listFriends: user.friends, message: "Sent list of friends" }), { status: 201 });
        }
        else {
            return new Response(JSON.stringify({ message: "You are not registered" }), { status: 500 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while fetching friends" }), { status: 500 })
    }
}