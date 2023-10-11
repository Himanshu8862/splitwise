"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ShowEditTransaction = (props) => {

    const { data: session } = useSession();

    const router = useRouter();

    const userEmail = session?.user?.email;
    let friEmail = "";
    if((session?.user?.email) == props.transaction.receiverUser)
    {
        friEmail = props.transaction.senderUser;
    }
    else
    {
        friEmail = props.transaction.receiverUser;
    }

    const [name, setName] = useState(props.transaction.name)
    const [amount, setAmount] = useState(props.transaction.amount)
    const [paidBy, setPaidBy] = useState(props.transaction.receiverUser)
    const [divideEqual, setDivideEqual] = useState(true)
    const [sender, setSender] = useState(props.transaction.senderUser)
    const [receiver, setReceiver] = useState(props.transaction.receiverUser)

    const [edit, setEdit] = useState(false);

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
            const res = await fetch("api/transaction/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                //sender  = who will pay money later
                body: JSON.stringify({
                    id: props.transaction._id, name, finalAmount, sender, receiver, senderUserId: props.transaction.sender, receiverUserId: props.transaction.receiver
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
        <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label>
                Name:
                <input
                    required
                    disabled={!edit}
                    type="text"
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => {setError(""); setName(e.target.value)}}
                />
            </label>
            <label>
                Amount:
                <input
                    required
                    disabled={!edit}
                    type="number"
                    placeholder='Enter Amount'
                    value={amount}
                    onChange={(e) => {setError(""); setAmount(e.target.value)}}
                />
            </label>
            <label>
                Paid by:
                <select disabled={!edit} onChange = {(e) => {
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
                    <option value={props.transaction.receiverUser} selected>{props.transaction.receiverUser}</option>
                    <option value={props.transaction.senderUser}>{props.transaction.senderUser}</option>
                </select>
            </label>
            {edit && <label>
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
            </label>}
            
            {edit && <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">
                Submit
            </button>}
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
        </form>
        {edit ? <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2" onClick = {() => {setEdit(false)}}>
            Cancel Edit
        </button>:<button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2" onClick = {() => {setEdit(true)}}>
            Edit Transaction
        </button>}
        </>
    )

}

export default ShowEditTransaction