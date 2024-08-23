"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
  return (
    <div className="flex gap-4">
      <Sidebar className="h-screen">
        <Menu menuItemStyles={{}}>
          <MenuItem component={<Link href="/documentation" />}>
            Documentation
          </MenuItem>
          <MenuItem component={<Link href="/calendar" />}> Calendar</MenuItem>
          <MenuItem component={<Link href="/e-commerce" />}>
            {" "}
            E-commerce
          </MenuItem>
        </Menu>
      </Sidebar>
      <div>
        <div>hellp</div>
      </div>
    </div>
  );
}
