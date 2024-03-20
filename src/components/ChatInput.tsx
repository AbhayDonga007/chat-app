"use client";
import { FunctionComponent, useRef, useState } from "react";
import {Textarea} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FunctionComponent<ChatInputProps> = ({
  chatPartner,
  chatId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);
    
    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="border-t border-gray-200 px-4 pt-4 pb-3 mb-2 sm:mb-0">
      <div className="relative flex-1 items-center overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-black">
        <Textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`  Message ${chatPartner.name}`}
          className="block w-full resize-none border-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />

        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrin-0">
            <Button onClick={sendMessage} type="submit">
              {isLoading ? <Loader2 className="ml-2 h-6 w-6 animate-spin"/> : <SendIcon className="h-6 w-6 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function SendIcon({ ...props }) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default ChatInput;
