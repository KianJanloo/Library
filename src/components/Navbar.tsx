"use client";
import { parseCookies } from "nookies"
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathName = usePathname();
  const [token, setToken] = useState<null | string>("");

  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.token || null)
  }, []);

  const roots = [
    { title: "Home", link: "/" },
    { title: "Dashboard", link: "/dashboard" },
    { title: "Library", link: "/library" },
    { title: "Cart", link: "/cart" },
  ];

  return (
    <>
      {pathName !== "/auth/login" && pathName !== "/auth/register" && (
        <div className="flex p-4 justify-between">
          <div className="flex gap-4">
            {roots.map((item, index) => (
              <Link
                className={`${pathName === item.link ? "text-gray-300" : ""}`}
                key={index}
                href={item.link}
              >
                {" "}
                {item.title}{" "}
              </Link>
            ))}
          </div>
          {token && (
            <Image
              className="rounded-full cursor-pointer bg-white"
              height={40}
              width={40}
              src={""}
              alt=""
            />
          )}
          {!token && (
            <div
              onClick={() => redirect("/auth/login")}
              className="bg-blue-500 cursor-pointer text-white rounded-full px-4 py-1"
            >
              {" "}
              Login{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
