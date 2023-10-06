"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ListGroups = () => {
    const [haveGroups, setHaveGroups] = useState(false);
    const [groups, setGroups] = useState([]);

    const { data: session } = useSession();

    const fetchGroups = async () => {
        const userEmail = session?.user?.email;
        // console.log(userEmail);
        if (session?.user?.email) {
            try {
                const res = await fetch(`/api/group/${userEmail}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const resData = await res.json();
                // console.log("resdata from fetching grps", resData);

                if (res.ok) {
                    // console.log("in res.ok");
                    if(resData.listGroups.length > 0)
                        setHaveGroups(true);
                    setGroups(resData.listGroups)
                } else {
                    console.log(resData.message)
                }

            } catch (error) {
                console.log("Error : ", error);
            }
        } else {
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [session?.user?.email])

    return (
        <>
            <div>
                <Link className="float-right" href="/groups/new"><button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">
                    Create new Group
                </button></Link>
            </div>

            <div>
                <b>Your Groups</b>
                {haveGroups ? groups.map((grp, idx) => {
                    return (
                        <div key={idx}>
                            <h2>{grp.name}</h2>
                        </div>
                    );
                }) : <p>No group present</p>}
            </div>

        </>
    )
}

export default ListGroups