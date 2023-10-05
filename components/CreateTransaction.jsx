"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreateTransaction = (props) => {
    
    const { data: session } = useSession();

    const router = useRouter();

    const userEmail = session?.user?.email;
    const friEmail = props.friend.email;

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [paidBy, setPaidBy] = useState(userEmail)
    const [divideEqual, setDivideEqual] = useState(true)
    const [sender, setSender] = useState(friEmail)
    const [receiver, setReceiver] = useState(userEmail)

    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalAmount = amount;
        if(divideEqual)
        {
            finalAmount = amount/2;
        }
        // console.log(paidBy)
        // console.log(sender)
        // console.log(receiver)


        try {
            const res = await fetch("api/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //sender  = who will pay money later
                body: JSON.stringify({
                    name, finalAmount, sender, receiver
                })
            })

            const resData = await res.json();

            if (res.ok) {
                console.log(resData.message)
                router.push("/dashboard")

            } else {
                console.log(resData.message)
            }
            

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                required
                type="text"
                placeholder='Enter Name'
                value={name}
                onChange={(e) => {setError(""); setName(e.target.value)}}
            />
            <input
                required
                type="number"
                placeholder='Enter Amount'
                value={amount}
                onChange={(e) => {setError(""); setAmount(e.target.value)}}
            />
            <label>
                Paid by:
                <select onChange = {(e) => {
                    setError("");
                    setPaidBy(e.target.value)
                    if(e.target.value == userEmail)
                    {
                        setSender(friEmail);
                        setReceiver(userEmail);
                    }
                    else
                    {
                        setSender(userEmail);
                        setReceiver(friEmail);
                    }
                    }}>
                    <option value={userEmail} selected>{userEmail}</option>
                    <option value={friEmail}>{friEmail}</option>
                </select>
            </label>
            <label>
                <select onChange = {(e) => {
                    setError("");
                    if((e.target.value) == "true")
                    {
                        setDivideEqual(true)
                    }
                    else
                    {
                        setDivideEqual(false)
                    }
                    }}>
                    <option value="true" selected>Divide Equally</option>
                    <option value="false">Full payment</option>
                </select>
            </label>
            
            <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">
                Create Transaction
            </button>
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
        </form>
    )
}


export default CreateTransaction