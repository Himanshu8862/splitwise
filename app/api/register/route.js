import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt"

// Register
export const POST = async (req) => {
    try {
        await connectToDB();

        const { email, name, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await User.findOne({ email });
        console.log("userExists: ", userExists);
        if (userExists) {
            return new Response(JSON.stringify({ message: "Email already exists" }), { status: 500 });
        }

        await User.create({ name, email, password: hashedPassword });

        return new Response(JSON.stringify({ message: "User registered" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured while registering the user" }), { status: 500 })
    }
}