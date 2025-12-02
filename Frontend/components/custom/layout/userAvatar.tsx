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
import { userRole } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserAvatar = ({ role }: { role: userRole }) => {
  const { setSessionState, setUserState } = useAuthStore();
  const router = useRouter();

  const logOutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onMutate: () => {
      toast.loading("Logging Out...", { richColors: true });
    },
    onSuccess: () => {
      setUserState(null, "user");
      setSessionState(0, 0);
      toast.dismiss();
      toast.success("User Logged Out Successfully", { richColors: true });
      router.push("/");
    },
  });

  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-9 h-9 rounded-full bg-pink-200 cursor-pointer hover:bg-purple-300"
        >
          JT
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Account Options</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled className="flex justify-between">
            Edit Profile
            {role && (
              <Badge className="text-black dark:text-white bg-linear-to-b from-purple-500 to-pink-500 capitalize">
                {role}
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
