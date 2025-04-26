"use client";

import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { MoreVerticalIcon } from 'lucide-react';
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import useConfirm from '@/hooks/use-confirm';
import { Skeleton } from '@/components/ui/skeleton';

const UserButton = () => {
    const { user, signOut } = useUser();
    const { isMobile } = useSidebar();
    const [ConfirmDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: "You will be signed out of your account when this action is completed"
    });
    
    const handleSignOut = async () => {
        const ok = await confirm();
        if (!ok) return;
        signOut.mutate();
    }

  return (
    <>
    <ConfirmDialog />

    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                {user ? <AvatarButton user={user} /> : <UserSkeleton />}
                <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
        >
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {user ? <AvatarButton user={user} /> : <UserSkeleton />}
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            
            <Link
                href={'/workspace'}
            >
                <DropdownMenuItem className='cursor-pointer'>
                    <UserCircleIcon />
                    Profile
                </DropdownMenuItem>
            </Link>
            <Link
                href={'/workspace'}
            >
                <DropdownMenuItem className='cursor-pointer'>
                    <GearIcon />
                    Settings
                </DropdownMenuItem>
            </Link>
            
            <DropdownMenuItem>
                <CreditCardIcon />
                Billing
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
                <ExitIcon />
                Sign Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default UserButton;


const AvatarButton = ({ user }: { user: User | undefined }) => {
    const userFallback = user?.firstName.charAt(0)! + user?.lastName!.charAt(0);

  return (
    <>
        <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user?.imageUrl} alt={`${user?.firstName} ${user?.lastName}`} />
            <AvatarFallback className="rounded-lg">{userFallback}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
            <span className="truncate text-xs text-muted-foreground">
                {user?.email}
            </span>
        </div>
    </>
  )
}

const UserSkeleton = () => {
  return (    
    <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8" />
        <div className="space-y-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-2 w-[200px]" />
        </div>
    </div>
  )
}