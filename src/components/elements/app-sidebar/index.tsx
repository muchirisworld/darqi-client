"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    AudioWaveform,
    CheckSquare,
    Command,
    Frame,
    GalleryVerticalEnd,
    ListChecks,
    MailPlus,
    SquareTerminal,
    User,
    Wrench,
} from "lucide-react";
import UserButton from "./user-button";
import NavMain from "./nav-main";
import NavProjects from "./nav-projects";
import WorkspaceSwitcher from "./workspace-switcher";
import { CalendarDaysIcon, FolderOpenIcon, GlobeEuropeAfricaIcon, ShieldCheckIcon, TagIcon } from "@heroicons/react/24/outline";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    workspaces: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Calendar",
            url: "#",
            icon: CalendarDaysIcon,
        },
        {
            title: "Projects",
            url: "#",
            icon: FolderOpenIcon,
        },
        {
            title: "My Tasks",
            url: "#",
            icon: CheckSquare,
        },
        {
            title: "Labels",
            url: "#",
            icon: TagIcon,
        },
        {
            title: "Checklists",
            url: "#",
            icon: ListChecks,
        },
    ],
    navAdmin: [
        {
            title: "Members",
            url: "#",
            icon: User,
        },
        {
            title: "Roles & Permissions",
            url: "#",
            icon: ShieldCheckIcon,
        },
        {
            title: "Invites",
            url: "#",
            icon: MailPlus,
        },
    ],
    projects: [
        {
            name: "Design System",
            url: "#",
            icon: Frame,
        },
        {
            name: "Marketing Website",
            url: "#",
            icon: GlobeEuropeAfricaIcon,
        },
        {
            name: "Internal Tools",
            url: "#",
            icon: Wrench,
        },
    ]
}


const AppSidebar = () => {
  return (
    <Sidebar>
        <SidebarHeader>
            <WorkspaceSwitcher workspaces={data.workspaces} />
        </SidebarHeader>
        <SidebarContent>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <UserButton />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;
