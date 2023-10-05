"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'

const ListFriends = () => {
    const [haveFriends, setHaveFriends] = useState(false);
    const [friends, setFriends] = useState([])

    const { data: session } = useSession();

    const fetchFriends =  async ()=> {
        const userEmail = session?.user?.email;
        if(session?.user?.email)
        {
            try {
                console.log(userEmail)
                const res = await fetch("api/user/"+userEmail, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const resData = await res.json();

                if (res.ok) {
                    console.log(resData.listFriends);
                    console.log(resData.message)
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

    useEffect(  () => {
        fetchFriends()
    }, [session?.user?.email])

    return(
        <div>
            <b>Your Friends</b>
            {haveFriends ? friends.map(friend => {
                return (
                <div>
                    <h2>{friend.email}</h2>
                    <h2>{friend.name}</h2>
                </div>
                );
            }): <p>No Friends added</p>}
        </div>
    )
}

export default ListFriends