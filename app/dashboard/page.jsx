import AddFriend from "@/components/AddFriend"
import ListFriends from "@/components/ListFriends"
import ListGroups from "@/components/ListGroups"
import ShowFriendChat from "@/components/ShowFriendChat"

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
                {/* <ShowFriendChat/> */}
            </div>
        </div>
        </>
    )
}

export default Dashboard