"use client";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import FriendsList from "@/components/FriendsList";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";

interface MobileChatLayoutProps {
  session: Session;
  unseenRequestCount: number;
}

const MobileChatLayout: FunctionComponent<MobileChatLayoutProps> = ({
  session,
  unseenRequestCount,
}) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div className="fixed bg-zinc-50 border-b border-zinc-200 top-0 inset-x-0 py-2 px-4">
      <div className="w-full flex justify-between items-center">
        <MessageSquareIcon className="h-6 w-6" />
        <Button
          onClick={() => setOpen(true)}
          className="gap-4 text-white bg-black"
        >
          Menu <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="-translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative h-7 w-7 rounded-md bg-gray-200 text-black-300 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <X className="h-7 w-7" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                      {/* <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        Your content
                      </div> */}
                      <div className="border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                        <div className="flex h-full flex-col gap-2 scroll-auto">
                          <div className="flex h-[60px] items-center border-b px-6">
                            <Link
                              className="flex items-center gap-2 font-semibold"
                              href="/dashboard/chats"
                            >
                              <MessageSquareIcon className="h-6 w-6" />
                              <span className="">Chatter</span>
                            </Link>
                            <Button
                              className="ml-auto h-8 w-8 hover:bg-gray-400"
                              size="icon"
                              variant="outline"
                            >
                              <BellIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex-1 overflow-auto py-2">
                            <div className="flex items-center gap-4 p-4">
                              <div className="relative h-8 w-8">
                                <Image
                                  fill
                                  referrerPolicy="no-referrer"
                                  className="rounded-full"
                                  src={session.user.image || ""}
                                  alt="Your profile picture"
                                />
                              </div>
                              <div className="leading-none">
                                <h2 className="font-semibold text-sm">
                                  {session.user.name}
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {session.user.email}
                                </p>
                              </div>
                              <Button
                                className="ml-auto w-8 h-8 hover:bg-gray-400"
                                size="icon"
                                variant="outline"
                              >
                                <FileEditIcon className="h-4 w-4" />
                              </Button>
                            </div>
                            <nav className="grid items-start px-4 text-sm font-medium">
                              <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/dashboard/chats"
                              >
                                <MessageSquareIcon className="h-4 w-4" />
                                Chats
                              </Link>
                              <FriendsList
                                sessionId={session.user.id}
                                initialUnseenRequestCount={unseenRequestCount}
                              />
                              <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/dashboard/add"
                              >
                                <UsersIcon className="h-4 w-4" />
                                Add Friend
                              </Link>
                              <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                              >
                                <SettingsIcon className="h-4 w-4" />
                                Settings
                              </Link>
                            </nav>
                          </div>
                          <div className="p-4">
                            <li className="flex items-center text-sm font-semibold">
                              <LogoutButton />
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

function BellIcon({ ...props }) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function FileEditIcon({ ...props }) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function MessageSquareIcon({ ...props }) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SearchIcon({ ...props }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon({ ...props }) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

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

function LogOutIcon({ ...props }) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

export default MobileChatLayout;
