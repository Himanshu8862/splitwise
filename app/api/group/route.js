import Group from "@/models/Group";
import User from "@/models/User";
import { connectToDB } from "@/utils/database"

export const POST = async (req) => {
    try {
        await connectToDB();
        const { name, participants } = await req.json();
        // console.log(name, participants);
        const newGrp = await Group.create({ name, participants });
        // console.log(newGrp);

        participants.forEach(async (member) => {
            const user = await User.findById(member);
            // console.log(user)
            user.groups.push(newGrp._id);
            user.save();
        });

        return new Response(JSON.stringify({ message: "Group created" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while creating group" }), { status: 500 })
    }

}