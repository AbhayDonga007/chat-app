'use client'
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendsListProps {
    sessionId: string
    initialUnseenRequestCount: number
}

const FriendsList: FunctionComponent<FriendsListProps> = ({sessionId,initialUnseenRequestCount}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(initialUnseenRequestCount)
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:incoming_friend_requests:${sessionId}`))
    pusherClient.subscribe(toPusherKey(`user:friends:${sessionId}`))

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1)
    }

    const addedFriendHandler = () => {
      setUnseenRequestCount((prev) => prev - 1)
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)
    pusherClient.bind('new_friend', addedFriendHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:incoming_friend_requests:${sessionId}`))
      pusherClient.unsubscribe(toPusherKey(`user:friends:${sessionId}`))

      pusherClient.unbind('new_friend', addedFriendHandler)
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [sessionId])
  return (
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      href="/dashboard/requests"
    >
      <UsersIcon className="h-4 w-4" />
      Contacts
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {unseenRequestCount <= 0 ? null : unseenRequestCount}
      </Badge>
    </Link>
  );
};

function UsersIcon({ ...props }) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

export default FriendsList;
