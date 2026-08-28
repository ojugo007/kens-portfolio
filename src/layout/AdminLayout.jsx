import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
    Menu,
    X,
    LayoutDashboard,
    FolderKanban,
    BriefcaseBusiness,
    GraduationCap,
    Layers3,
    MessageSquare,
    Star,
    Wrench,
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "../context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { useClientConfig } from "@/hooks/useClientConfig";
import { NameInnitial } from "@/lib/utils";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { dark, setDark } = useTheme();
    const { config } = useClientConfig();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Projects",
            path: "/admin/projects",
            icon: FolderKanban,
        },
        {
            name: "Services",
            path: "/admin/services",
            icon: Wrench,
        },
        {
            name: "Experience",
            path: "/admin/experience",
            icon: BriefcaseBusiness,
        },
        {
            name: "Education",
            path: "/admin/education",
            icon: GraduationCap,
        },
        {
            name: "Stack",
            path: "/admin/stack",
            icon: Layers3,
        },
        {
            name: "Testimonials",
            path: "/admin/testimonials",
            icon: Star,
        },
        {
            name: "Messages",
            path: "/admin/messages",
            icon: MessageSquare,
        },
    ];

    const closeSidebar = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");

        // Change this if you use a different token name
        window.location.href = "/admin/login";
    };

    return (
        <div className="bg-base min-h-screen overflow-hidden">
            <main className="flex min-h-screen relative">

                {/* Desktop spacer */}
                <div className="hidden lg:block w-64.5 shrink-0" />

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ================= SIDEBAR ================= */}
                <Card
                    className={`
                        w-64.5 rounded-none text-ink border-0 shadow-none ring-0
                        fixed top-0 left-0 h-screen flex flex-col z-40 gap-0
                        transition-transform duration-300 ease-in-out

                        lg:top-3.75
                        lg:left-3.75
                        lg:h-[calc(100vh-30px)]
                        lg:translate-x-0

                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full lg:translate-x-0"
                        }
                    `}
                >

                    {/* Sidebar Header */}
                    <CardHeader className="border-0 pt-6 pb-6 bg-surface rounded-none shrink-0 relative">

                        {/* Mobile close */}
                        <button
                            className="lg:hidden absolute top-4 right-4 text-ink-muted hover:text-ink"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={18} />
                        </button>

                        {/* Theme switch */}
                        <Switch
                            checked={dark === "dark"}
                            onCheckedChange={(checked) =>
                                setDark(checked ? "dark" : "light")
                            }
                        />

                        <Avatar size="lg" className="mx-auto mt-4">
                            <AvatarImage src={config?.avatarUrl} />

                            <AvatarFallback>
                                {NameInnitial(config?.fullName)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center mt-3">
                            <p className="text-[15px] font-semibold">
                                {config?.fullName}
                            </p>

                            <p className="text-[11px] text-ink-muted mt-1">
                                Administrator
                            </p>
                        </div>
                    </CardHeader>

                    {/* ================= NAVIGATION ================= */}
                    <CardContent className="bg-surface-alt p-4 flex-1 overflow-y-auto scrollbar-hide">

                        <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-4">
                            Administration
                        </p>

                        <nav className="flex flex-col gap-1">

                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={closeSidebar}
                                        className={({ isActive }) =>
                                            `
                                            flex items-center gap-3
                                            px-3 py-2.5
                                            text-[12px]
                                            transition-all duration-300
                                            border-l-2

                                            ${
                                                isActive
                                                    ? "bg-card text-accent border-accent"
                                                    : "text-ink-muted border-transparent hover:bg-card hover:text-ink"
                                            }
                                            `
                                        }
                                    >
                                        <Icon
                                            size={15}
                                            strokeWidth={1.8}
                                        />

                                        <span>{item.name}</span>
                                    </NavLink>
                                );
                            })}

                        </nav>

                        <Separator className="bg-edge my-5" />

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="
                                w-full
                                flex items-center gap-3
                                px-3 py-2.5
                                text-[12px]
                                text-ink-muted
                                hover:text-red-400
                                hover:bg-card
                                transition-all duration-300
                            "
                        >
                            <LogOut size={15} />

                            <span>Logout</span>
                        </button>

                    </CardContent>

                    {/* Sidebar footer */}
                    <CardFooter className="bg-surface rounded-none px-4 py-3">
                        <small className="text-[10px] text-ink-muted">
                            Admin Panel
                        </small>
                    </CardFooter>

                </Card>

                {/* ================= PAGE CONTENT ================= */}
                <div className="w-full flex-1 z-10 p-4 lg:p-6.5 text-ink min-h-screen overflow-x-hidden">

                    {/* Mobile top bar */}
                    <div className="
                        lg:hidden
                        flex items-center justify-between
                        mb-4
                        bg-surface
                        px-4 py-3
                        -mx-4 -mt-4
                    ">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-ink-muted hover:text-ink"
                        >
                            <Menu size={22} />
                        </button>

                        <span className="text-ink text-[14px] font-semibold">
                            Admin Panel
                        </span>

                        <div className="w-6" />
                    </div>

                    {/* Child page renders here */}
                    <Outlet />

                </div>

            </main>
        </div>
    );
};

export default AdminLayout;