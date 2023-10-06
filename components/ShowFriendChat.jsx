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
                    if(resData.listTransactions.length > 0)
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
        <div className="flex flex-col">
            <div className="flex flex-row justify-center items-end">
                <p className="font-bold text-4xl px-5">{props.friend.name}</p>
                <p className="font-bold text-2xl px-5"> - Transactions</p>
            </div>
            <div>
                {haveTransactions ? transactions.map((transaction, idx) => {
                    return (
                        <>
                            <div className="shadow-lg p-5 rounded-lg border border-t-4 border-green-400">
                                <div key={idx}>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-lg font-medium">Name: {transaction.name}</p>
                                        <p className="text-lg font-medium">Amount: {transaction.amount}</p>
                                        <p className="text-lg font-medium">Paid By: {transaction.receiverUser[0].name}</p>
                                        {/* <p>Sender: {transaction.senderUser[0].name}</p>
                                        <p>Receiver: {transaction.receiverUser[0].name}</p> */}
                                    </div>
                                    <div className="flex flex-row justify-end">
                                        <p className="px-5 text-xs">Created: {transaction.createdAt}</p>
                                        <p className="px-5 text-xs">Updated: {transaction.updatedAt}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }) : <p>No Transactions</p>}
            </div>
            <div className="sticky bottom-0">
                <Link href={{pathname : `/createTransaction`, query: props.friend}}>
                    <button className="bg-green-600 text-white font-bold w-full cursor-pointer px-6 py-2">Add new expense</button>
                </Link>
            </div>
        </div>
    )
}

export default ShowFriendChat