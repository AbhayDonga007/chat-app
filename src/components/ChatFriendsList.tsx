"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { pusherClient } from "@/lib/pusher";
import toast from "react-hot-toast";
import UnseenChatToast from "./UnseenChatToast";
import Image from "next/image";

interface ChatFriendsListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

const ChatFriendsList: FunctionComponent<ChatFriendsListProps> = ({
  friends,
  sessionId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeChats, setActiveChats] = useState<User[]>(friends);
  const [unseenMessages, setUnseenMessages] = useState<Message[]>();

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:chats:${sessionId}`));
    pusherClient.subscribe(toPusherKey(`user:friends${sessionId}`));

    const newFriendHandler = (newFriend: User) => {
      console.log("received new user", newFriend);
      setActiveChats((prev) => [...prev, newFriend]);
    };

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      // should be notified
      toast.custom((t) => (
        <UnseenChatToast
          t={t}
          sessionId={sessionId}
          senderId={message.senderId}
          senderImg={message.senderImg}
          senderMessage={message.text}
          senderName={message.senderName}
        />
      ));

      setUnseenMessages((prev) => {
        if (Array.isArray(prev)) {
          return [...prev, message];
        } else {
          return [message];
        }
      });
    };

    pusherClient.bind("new_message", chatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("new_message", chatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [pathname, sessionId, router]);

  useEffect(() => {
    if (pathname?.includes("chats")) {
      setUnseenMessages((prev) => {
        return prev?.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <div className="flex flex-col w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Chats</h1>
          {/* <Button className="ml-auto bg-black text-white" size="sm">
            New chat
          </Button> */}
        </div>
        <div className="flex">
          <Input
            className="flex-1 mr-6"
            placeholder="Search chats..."
            type="search"
          />
          <MicroscopeIcon className="h-5 w-5 text-gray-600" />
        </div>
        <Card>
          <CardContent className="p-0">
            <div>
              {activeChats.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages?.filter(
                  (unseenMsg) => {
                    return friend.id === unseenMsg.senderId || 0;
                  }
                ).length;
                return (
                  <div key={friend.id} className="py-2">
                    <Link
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-all dark:hover:bg-gray-800"
                      href={`/dashboard/chats/${chatHrefConstructor(
                        sessionId,
                        friend.id
                      )}`}
                    >
                      <div className="relative h-10 w-10">
                        <Image
                          fill
                          referrerPolicy="no-referrer"
                          className="rounded-full"
                          src={friend.image || ""}
                          alt="Your profile picture"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{friend.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Hey, Let&apos;s connect
                        </p>
                      </div>
                      {unseenMessagesCount! > 0 ? (
                        // <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
                        //   {unseenMessagesCount}
                        // </div>
                        <Badge className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                          {unseenMessagesCount}
                        </Badge>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

function MicroscopeIcon({ ...props }) {
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
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

export default ChatFriendsList;
