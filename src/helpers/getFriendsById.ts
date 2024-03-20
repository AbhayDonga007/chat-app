import { fetchRedis } from "./redis"

export const getFriendsById = async (userId: string) => {
    const friendIds = await fetchRedis('smembers', `user:friends:${userId}`) as string[]

    const friends = await Promise.all(
        friendIds.map(async (friendId) => {
            const friend = await fetchRedis('get', `user:${friendId}`) as string
            const parsedFriend = JSON.parse(friend) as User
            return parsedFriend
          })
    )
    return friends
}