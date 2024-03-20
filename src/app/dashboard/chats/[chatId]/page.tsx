import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

interface pageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:messages:${chatId}`,
      0,
      -1
    );
    const dbMessages = results.map((message) => JSON.parse(message) as Message);
    const reverseDbMessages = dbMessages.reverse();
    const messages = messageArrayValidator.parse(reverseDbMessages);
    return messages
  } catch (e) {
    console.log(e);
  }
}

const page: FunctionComponent<pageProps> = async ({ params }: pageProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { chatId } = params;

  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;
  const initialMessages = await getChatMessages(chatId);
  
  return (
    <main className="flex-1">
      <div className="flex items-center gap-4 p-4 border-b-[2px]">
        <div className="relative h-9 w-9">
          <Image
            fill
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={chatPartner.image || ""}
            alt="Your profile picture"
          />
        </div>
        <div className="leading-none">
          <h2 className="font-semibold text-sm">{chatPartner.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {chatPartner.email}
          </p>
        </div>
      </div>
      <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-70px)]">
        <Messages
          chatId={chatId}
          chatPartner={chatPartner}
          sessionImg={session.user.image}
          sessionId={session.user.id}
          initialMessages={initialMessages || []}
        />
        <ChatInput 
          chatId={chatId}
          chatPartner={chatPartner}
        />
      </div>
    </main>
  );
};

export default page;
