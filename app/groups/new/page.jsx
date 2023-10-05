"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CreateGroup = () => {
    const [grpName, setGrpName] = useState("")
    const { data: session } = useSession();
    const router = useRouter();

    const [haveFriends, setHaveFriends] = useState(false);
    const [friends, setFriends] = useState([])
    const [checked, setChecked] = useState([]);

    const fetchFriends = async () => {
        const userEmail = session?.user?.email;

        if (session?.user?.email) {
            try {
                // console.log(userEmail)
                const res = await fetch("/api/user/" + userEmail, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const resData = await res.json();

                if (res.ok) {
                    setHaveFriends(true);
                    setFriends(resData.listFriends);
                    // console.log(resData);
                    // add the user itself to participants list
                    if (!checked.includes(resData.currUserID)) {
                        let updatedList = [...checked, resData.currUserID];
                        setChecked(updatedList);
                    }
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

    const handleCheck = (e) => {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    }

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        if (grpName === "" || checked.length < 3) {
            alert("Both group name and participants are required.")
            return;
        }

        // console.log(grpName, checked)

        // call api
        const res = await fetch("/api/group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: grpName, participants: checked })
        });

        const resData = await res.json();

        if (res.ok) {
            setGrpName("")
            setChecked([]);
            router.push("/dashboard")
            // console.log(resData);
        }
    }

    return (
        <div>
            <h1>Start a new group</h1>
            <form onSubmit={handleCreateGroup}>
                <input
                    type="text"
                    value={grpName}
                    placeholder="Enter group name"
                    required
                    onChange={e => setGrpName(e.target.value)}
                />
                <p>Add participants</p>
                {haveFriends ? friends.map((friend, idx) => (
                    <div key={idx}>
                        <input value={friend._id} type="checkbox" onChange={handleCheck} />
                        <span>{friend.name} - {friend.email}</span>
                    </div>
                )) : <p>No Friends added</p>}
                <button className="bg-green-600 text-white font-bold w-fit cursor-pointer px-6 py-2">
                    Create group
                </button>
            </form>
        </div>
    )
}

export default CreateGroup