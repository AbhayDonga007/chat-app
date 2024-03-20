import AddFriends from "@/components/AddFriends";
import { FunctionComponent } from "react";

interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = () => {
    return (
      <>
        <AddFriends />
      </>
    );
}
 
export default page;