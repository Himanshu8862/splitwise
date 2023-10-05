"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const ListFriends = () => {
    const [haveFriends, setHaveFriends] = useState(false);
    const [friends, setFriends] = useState([])

    const { data: session } = useSession();

    const fetchFriends = async () => {
        const userEmail = session?.user?.email;
        if (session?.user?.email) {
            try {
                const res = await fetch("api/user/" + userEmail, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const resData = await res.json();

                if (res.ok) {
                    // console.log(resData.listFriends);
                    // console.log(resData.message)
                    setHaveFriends(true);
                    setFriends(resData.listFriends)
                } else {
                    console.log(resData.message)
                }

            } catch (error) {
                console.log("Error : ", error);
            }
        }
    }

    useEffect(() => {
        fetchFriends()
    }, [session?.user?.email])

    return (
        <div>
            <b>Your Friends</b>
            {haveFriends ? friends.map((friend, idx) => {
                return (
                <div key={idx}>
                    <Link href={{pathname : `/createTransaction`, query: friend}}>
                        <h2>Email: {friend.email}, Name: {friend.name}</h2>
                    </Link>
                </div>
                );
            }) : <p>No Friends added</p>}
        </div>
    )
}

export default ListFriends