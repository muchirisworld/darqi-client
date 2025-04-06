"use client";

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import AvatarButton from './avatar-button';
import Link from 'next/link';
import { PersonIcon, GearIcon, ExitIcon } from '@radix-ui/react-icons';
import useConfirm from '@/hooks/use-confirm';
import { useUser } from '@/hooks/use-user';

const ProfileCard = () => {
    const { user, signOut } = useUser();
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
        <DropdownMenuTrigger>
            <ProfileAvatar currentUser={user!}  />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' side='right'>
            <DropdownMenuLabel className='flex items-center gap-2'>
                <ProfileAvatar currentUser={user!} />
                <div className="leading-tight">
                    <h3 className="">{user?.email}</h3>
                    <p className="text-muted-foreground text-sm">{`${user?.firstName} ${user?.lastName}`}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
                href={'/workspace'}
            >
                <DropdownMenuItem className='cursor-pointer'>
                    <PersonIcon />
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
            
            <DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
                <ExitIcon />
                Sign Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default ProfileCard;

/*
    1. User info
    2. Theme switcher
    3. Sign out
*/

type ProfileAvatarProps = {
    currentUser?: any
}

const ProfileAvatar = ({ currentUser }: ProfileAvatarProps) => {
    const firstLetter = currentUser?.name?.charAt(0) || '';
  return (
    <AvatarButton
        alt={currentUser?.name!}
        fallback={firstLetter}
        imageUrl={currentUser?.image ?? firstLetter}
        className='size-9'
    />
  )
}