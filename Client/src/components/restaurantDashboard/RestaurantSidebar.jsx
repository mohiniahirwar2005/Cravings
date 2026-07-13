import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const RestaurantSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menus = [
    {
      title: "Dashboard",
      value: "overview",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Orders",
      value: "orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      title: "Settings",
      value: "settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">

      <div>

        <h1 className="text-2xl font-bold text-orange-600 mb-8">
          Restaurant
        </h1>

        {menus.map((menu) => (
          <button
            key={menu.value}
            onClick={() => setActiveTab(menu.value)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition
            ${
              activeTab === menu.value
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-100"
            }`}
          >
            {menu.icon}
            {menu.title}
          </button>
        ))}

      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white p-3 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
};

export default RestaurantSidebar;

