import ChatFriendsList from "@/components/ChatFriendsList";
import { getFriendsById } from "@/helpers/getFriendsById";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = async () => {
    const session = await getServerSession(authOptions)
    if(!session) notFound()
    const friends = await getFriendsById(session.user.id);
    return (
        <ChatFriendsList friends={friends} sessionId={session.user.id}/>
    );
}
 
export default page;