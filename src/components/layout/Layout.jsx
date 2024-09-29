import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaMoneyBill,
  FaCreditCard,
  FaChartLine,
  FaCloudUploadAlt,
  FaLayerGroup,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const handleNavMenuOpen = () => {
    setNavOpen(!navOpen);
  };

  const navItems = useMemo(() => {
    const items = [
      {
        category: "Overview",
        items: [
          {
            id: 1,
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/dashboard",
          },
          {
            id: 2,
            name: "Organisation",
            icon: <FaBuilding />,
            path: "/organisation",
          },
          { id: 3, name: "Expenses", icon: <FaMoneyBill />, path: "/expenses" },
          { id: 4, name: "Cards", icon: <FaCreditCard />, path: "/cards" },
        ],
      },
      {
        category: "Reporting",
        items: [
          {
            id: 5,
            name: "Analytics",
            icon: <FaChartLine />,
            path: "/analytics",
          },
        ],
      },
      {
        category: "Master",
        items: [
          {
            id: 6,
            name: "Bulk Uploads",
            icon: <FaCloudUploadAlt />,
            path: "/bulk-uploads",
          },
          {
            id: 7,
            name: "Spend Categories",
            icon: <FaLayerGroup />,
            path: "/spend-categories",
          },
          {
            id: 8,
            name: "Policies",
            icon: <FaClipboardList />,
            path: "/policies",
          },
          { id: 9, name: "Users", icon: <FaUsers />, path: "/users" },
        ],
      },
      {
        category: "Preferences",
        items: [
          { id: 10, name: "Settings", icon: <FaCog />, path: "/settings" },
          { id: 11, name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
        ],
      },
    ];

    return items;
  });

  useEffect(() => {
    const activeItemFromPath = navItems
      .flatMap((section) => section.items)
      .find((item) => item.path === location.pathname);

    if (activeItemFromPath) {
      setActiveItem(activeItemFromPath.id);
    }
  }, [location, navItems]);

  return (
    <div>
      <Navbar handleNavMenuOpen={handleNavMenuOpen} />
      <div className="flex flex-row">
        <aside
          className={
            navOpen
              ? `absolute h-[100vh] md:h-auto md:flex flex-col justify-start items-start bg-[#2634bb] w-auto lg:w-[15%] text-white z-[99]`
              : `hidden lg:relative h-[100vh] md:h-auto md:flex flex-col justify-start items-start bg-[#2634bb] w-auto lg:w-[15%] text-white z-[99]`
          }
        >
          {navItems.map((section) => (
            <div key={section.category} className="mb-0 mt-6 w-full">
              <h3 className="text-sm tracking-wide px-4 text-gray-300 font-extralight mb-2">
                {section.category}
              </h3>
              <ul className="w-full">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center text-gray-100 mb-2 hover:text-custom-blue cursor-pointer hover:bg-white hover:border-l-[4px] transition-all hover:border-custom-blue w-full px-4 py-2 ${
                      activeItem === item.id
                        ? "bg-white border-l-[4px] border-custom-blue"
                        : ""
                    }`}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center  text-[16px] font-light tracking-wide ${
                        activeItem === item.id ? "text-custom-blue" : ""
                      }`}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <main className="w-full md:w-[85%] p-2 md:p-4 h-[100vh] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
