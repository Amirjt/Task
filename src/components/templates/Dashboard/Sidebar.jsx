"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/modules/ThemeToggle";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

const routes = [
  {
    label: "کاربران",
    path: "/",
    icon: <Users strokeWidth={1.3} size={18} />,
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen w-2/12 p-5 border-l border-muted dark:bg-[#141414] flex flex-col">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-bold text-lg hidden md:block">خوش آمدید ادمین عزیز</h2>
        <ThemeToggle />
      </div>
      <div className="mt-10 flex flex-col">
        {routes.map((route, index) => (
          <Link
            className={cn(
              route.path === pathName && "bg-primary",
              "font-semibold p-2 rounded-lg text-white flex items-center justify-between text-sm"
            )}
            key={index}
            href={route.path}
          >
            <span className="hidden md:block" >{route.label}</span>
            {route.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
