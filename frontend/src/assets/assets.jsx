import { MdDashboardCustomize } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import { PiChatTeardropDotsDuotone } from "react-icons/pi";
import { IoIosCall } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import profile from "./profile.jpg"
import login from "./login.jpg"

export const images = {
    profile,
    login,
}

export const menuItems = [
    {id:1, path: "/",  icon: <MdDashboardCustomize/>, name: "Dashboard"},
    {id:2, path: "/upload", icon: <RiAddBoxFill/> , name: "Upload Excel"},
    {id:3, path: "/history", icon: <FaHistory/>, name: "History"},
    {id:4, path: "/insight", icon: <PiChatTeardropDotsDuotone/> , name: "AI Insights"},
    {id:5, path: "/chat", icon: <IoIosCall/>, name: "Chat With File" },
    {id:6, path: "/settings", icon: <IoSettings/> , name: "Settings"},
]