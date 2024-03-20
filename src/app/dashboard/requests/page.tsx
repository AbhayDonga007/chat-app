import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

 
const page: FunctionComponent = async() => {
    const session = await getServerSession(authOptions)
    if(!session) notFound()

    const incomingSenderIds = (await fetchRedis('smembers',`user:incoming_friend_requests:${session.user.id}`)) as string[]

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const sender = (await fetchRedis('get',`user:${senderId}`)) as string
            const senderParsed = JSON.parse(sender) as User
            return {senderId: senderParsed.id, senderEmail : senderParsed.email, senderName: senderParsed.name, senderImage: senderParsed.image}
        })
    )

    return (
        <main className="flex-1 p-6">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-semibold">Friend Requests</h1>
       </div>
       <div className="space-y-4">
         <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
    );
}
 
export default page;