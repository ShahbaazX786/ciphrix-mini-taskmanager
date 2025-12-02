"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/lib/api/api.auth";
import { useAuthStore } from "@/lib/store/auth.store";
import { userResponseState } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserAvatar = ({ user }: { user: userResponseState }) => {
  const { setSessionState, setUserState } = useAuthStore();
  const router = useRouter();

  const logOutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onMutate: () => {
      toast.loading("Logging Out...", { richColors: true });
    },
    onSuccess: () => {
      setUserState(null, null, "user");
      setSessionState(0, 0);
      toast.dismiss();
      toast.success("User Logged Out Successfully", { richColors: true });
      router.push("/");
    },
  });

  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  const getInitials = (str: string) => {
    const [w1, w2] = str.trim().split(" ");
    return w1[0].toUpperCase() + w2[0].toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-9 h-9 rounded-full bg-pink-200 cursor-pointer hover:bg-purple-300"
        >
          {getInitials(user?.fullName || "")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Account Options</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled className="flex justify-between">
            Edit Profile
            {user?.role && (
              <Badge className="text-black dark:text-white bg-linear-to-b from-purple-500 to-pink-500 capitalize">
                {user?.role}
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Change Plan</DropdownMenuItem>
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
