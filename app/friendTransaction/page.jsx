const { default: ShowFriendChat } = require("@/components/ShowFriendChat")

const friendTransaction = ({searchParams}) => {
    const friend = searchParams
    return (
        <div>
            <ShowFriendChat friend = {friend}/>
        </div>
    )
}

export default friendTransaction