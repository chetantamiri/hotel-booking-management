import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: assets.dashboardIcon,
  },
  {
    name: "Add Rooms",
    path: "/owner/add-room",
    icon: assets.addIcon,
  },
  {
    name: "List Rooms",
    path: "/owner/list-rooms",
    icon: assets.listIcon,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r border-gray-200 py-6 flex flex-col">
      <div className="px-4 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-4">
          Management
        </p>
      </div>

      <nav className="flex-1 px-3">
        <div className="flex flex-col gap-1">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/owner"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <span
                className={`flex items-center justify-center w-5 h-5 ${
                  sidebarLinks.find((l) => l.path === item.path)
                    ? ""
                    : ""
                }`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className={`w-5 h-5 ${
                    sidebarLinks.find((l) => l.path === item.path)
                      ? ""
                      : ""
                  }`}
                />
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-6 mt-auto pt-6 border-t border-gray-100">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Site
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
