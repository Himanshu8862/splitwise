"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Link from 'next/link'

const ShowFriendChat = (props) => {
    const [haveTransactions, setHaveTransactions] = useState(false);
    const [transactions, setTransactions] = useState([])

    const friEmail = props.friend.email;
    // console.log(friEmail);

    const { data: session } = useSession();

    const fetchTransactions = async () => {
        const userEmail = session?.user?.email;
        if (session?.user?.email) {
            try {
                const res = await fetch("api/transaction/" + userEmail+"/"+ friEmail, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                // console.log("sent")

                const resData = await res.json();

                if (res.ok) {
                    // console.log(resData.listTransactions);
                    // console.log(resData.message)
                    setHaveTransactions(true);
                    setTransactions(resData.listTransactions)
                } else {
                    console.log(resData.message)
                }

            } catch (error) {
                console.log("Error : ", error);
            }
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [session?.user?.email])

    return (
        <div>
            <b>Transactions</b>
            {haveTransactions ? transactions.map((transaction, idx) => {
                return (
                    <>
                        <div key={idx}>
                            <h2>Name: {transaction.name}</h2>
                            <h2>Amount: {transaction.amount}</h2>
                            <h2>Sender: {transaction.senderUser[0].name}</h2>
                            <h2>Receiver: {transaction.receiverUser[0].name}</h2>
                        </div>
                        <div></div>
                    </>
                );
            }) : <p>No Friends added</p>}
            <Link href={{pathname : `/createTransaction`, query: props.friend}}>
                <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">Add expense</button>
            </Link>
        </div>
    )
}

export default ShowFriendChat