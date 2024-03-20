'use client'
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface LogoutButtonProps {}

const LogoutButton: FunctionComponent<LogoutButtonProps> = ({ ...props }) => {
  const [isLogout, setIsLogOut] = useState<boolean>(false);
  return (
    <Button
      className="w-full gap-5 bg-black text-white hover:bg-red-500"
      onClick={async () => {
        setIsLogOut(true);
        try {
          await signOut();
        } catch (e) {
          toast.error("Error logging out");
        } finally {
          setIsLogOut(false);
        }
      }}
    >
      {isLogout ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <div>Logout</div>
      )}
    </Button>
  );
};

export default LogoutButton;
