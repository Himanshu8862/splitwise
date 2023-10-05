import AddFriend from "@/components/AddFriend"
import ListFriends from "@/components/ListFriends"
import ListGroups from "@/components/ListGroups"

const Dashboard = () => {
    return (
        <>
        <div className="flex flex-row">
            <div className="basis-1/3">
                <AddFriend/>
                <ListFriends/>
                <ListGroups />
            </div>
            <div className="basis-2/3">

            </div>
        </div>
        </>
    )
}

export default Dashboard