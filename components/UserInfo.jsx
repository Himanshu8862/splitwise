"use client"
import { signOut, useSession } from "next-auth/react"

const UserInfo = () => {
    const { data: session } = useSession();


    return (
        <div className="grid place-items-center ">
            <div className="shadow-lg p-8 bg-zinc-100/10 flex flex-col gap-2 my-6">
                <div>
                    Name: <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    Email: <span className="font-bold">{session?.user?.email}</span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo