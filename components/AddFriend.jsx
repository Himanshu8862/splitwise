"use client";
import { useState } from "react";
import { useSession } from 'next-auth/react'

const AddFriend = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")
    
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Enter email");
            return;
        }

        try {
            const userEmail = session?.user?.email;
            const res = await fetch("api/user/"+userEmail, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            })

            const data = await res.json();

            if (res.ok) {
                alert(data.message)
            } else {
                setError(data.message);
            }

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => {setError(""); setEmail(e.target.value)}}
            />
            <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">
                Add as friend
            </button>
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
        </form>
    )
}

export default AddFriend