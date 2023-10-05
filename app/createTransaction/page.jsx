"use client";
import CreateTransaction from "@/components/CreateTransaction"

const CreateTrasaction = ({searchParams }) => {
    const friend = searchParams

    return (
        <>
            <CreateTransaction friend = {friend}/>
        </>
    )
}

export default CreateTrasaction