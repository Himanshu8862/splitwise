import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import brcypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectToDB();
                    const user = await User.findOne({ email })

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await brcypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };