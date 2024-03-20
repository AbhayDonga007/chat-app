"use client";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addFriendValidator } from "@/lib/validations/add-friends";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendsProps {}
type FormData = z.infer<typeof addFriendValidator>;

const AddFriends: FunctionComponent<AddFriendsProps> = () => {
  const [showSuccessStatus, setshowSuccessStatus] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(addFriendValidator) });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setshowSuccessStatus(true);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError("email", { message: e.message });
        return;
      }
      if (e instanceof AxiosError) {
        setError("email", { message: e.response?.data });
        return;
      }

      setError("email", { message: "Something went Wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add Friend by Email</h1>
        {/* <Button className="bg-black text-white">New chat</Button> */}
      </div>
      <div className="mt-6">
        <div className="grid gap-4">
          <Label className="text-sm font-semibold">Email Address</Label>
          <div className="flex">
            <Input
              {...register("email")}
              className="flex-1 mr-2"
              id="email"
              placeholder="Enter email address"
              type="email"
            />

            <Button className="bg-black text-white">Add Friend</Button>
          </div>
          <p className="text-sm font-semibold text-red-600">
            {errors.email?.message}
          </p>
          {showSuccessStatus ? (
            <p className="text-sm font-semibold text-green-600">
              Friend request sent!
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default AddFriends;
