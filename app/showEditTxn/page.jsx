"use client";
import ShowEditTransaction from "@/components/ShowEditTransaction";

const ShowEditTxn = ({searchParams }) => {
    const transaction = searchParams
    // console.log(transaction)

    return (
        <>
            <ShowEditTransaction transaction = {transaction}/>
        </>
    )
}

export default ShowEditTxn