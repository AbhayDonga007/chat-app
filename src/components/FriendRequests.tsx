"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FunctionComponent<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(incomingFriendRequests)

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:incoming_friend_requests:${sessionId}`))
    console.log("listening to ", `user:incoming_friend_requests:${sessionId}`)

    const friendRequestHandler = ({senderId,senderEmail, senderName, senderImage}: IncomingFriendRequest) => {
      console.log("function got called")
      setFriendRequests((prev)=>[...prev,{senderId, senderEmail, senderName, senderImage}])
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:incoming_friend_requests:${sessionId}`)
      )
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [sessionId])

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accepts", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };
  return (
    <>
      {friendRequests.length === 0 ? (
        <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
        Nothing to show here...
      </div>
      ) : (
        friendRequests.map((request) => (
          <div
            key={request.senderId}
            className="flex items-center px-4 py-3 bg-white rounded-lg shadow"
          >
            <Avatar>
              <AvatarImage
                src={request.senderImage || ""}
              />
            </Avatar>
            <div className="ml-4">
              <div className="font-semibold"> {request.senderName}</div>
              <div className="font-semibold text-xs text-gray-600 mb-2"> {request.senderEmail}</div>
            </div>
            <div className="ml-auto">
              <Button
                onClick={()=>acceptFriend(request.senderId)}
                className="mr-2 bg-green-500 hover:bg-green-600 text-white"
                variant="default"
              >
                Accept
              </Button>
              <Button
              onClick={()=>denyFriend(request.senderId)}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Decline
              </Button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
