"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarDashboard = () => {
  const pathName = usePathname();

  const roots = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Add Book", link: "/dashboard/addBock" },
    { title: "Update Book", link: "/dashboard/updateBook" },
  ];

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-4 border-r h-screen p-4">
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
      </div>
    </>
  );
};

export default NavbarDashboard;
