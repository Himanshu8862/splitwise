const { default: ShowFriendChat } = require("@/components/ShowFriendChat")

const friendTransaction = ({searchParams}) => {
    const friend = searchParams
    return (
        <div>
            <h1>{friend.name}</h1>
            <ShowFriendChat friend = {friend}/>
        </div>
    )
}

export default friendTransaction