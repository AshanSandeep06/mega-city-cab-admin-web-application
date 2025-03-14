import { v4 as uuidv4 } from "uuid";
import {
  HiOutlineAcademicCap,
  HiOutlineArchiveBox, HiOutlineAtSymbol, HiOutlineBars4, HiOutlineCalendar,
  HiOutlineCalendarDays, HiOutlineCheckBadge,
  HiOutlineCog6Tooth, HiOutlineEyeDropper,
  HiOutlineHome, HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import {HiOutlineBadgeCheck} from "react-icons/hi";

export const navLinks = [
  {
    id: uuidv4(),
    icon: HiOutlineHome,
    label: "Home",
    pathname: "/dashboard",
  },
  {
    id: uuidv4(),
    icon: HiOutlineCalendarDays,
    label: "Bookings",
    pathname: "/bookings",
  },
  {
    id: uuidv4(),
    icon: HiOutlineCheckBadge,
    label: "Vehicles",
    pathname: "/vehicles",
  },
  {
    id: uuidv4(),
    icon: HiOutlineUserCircle,
    label: "Drivers",
    pathname: "/drivers",
  },
  {
    id: uuidv4(),
    icon: HiOutlineUsers,
    label: "Users",
    pathname: "/users",
  },
];

export const discountFilterOptions = [
  {
    id: uuidv4(),
    value: "all",
    label: "All",
  },
  {
    id: uuidv4(),
    value: "no-discount",
    label: "No Discount",
  },
  {
    id: uuidv4(),
    value: "with-discount",
    label: "With Discount",
  },
];

export const sortByOptions = [
  {
    id: uuidv4(),
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    id: uuidv4(),
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    id: uuidv4(),
    value: "regularPrice-asc",
    label: "Sort by price (low first)",
  },
  {
    id: uuidv4(),
    value: "regularPrice-dsc",
    label: "Sort by price (high first)",
  },
  {
    id: uuidv4(),
    value: "maxCapacity-asc",
    label: "Sort by capacity (low first)",
  },
  {
    id: uuidv4(),
    value: "maxCapacity-dsc",
    label: "Sort by capacity (high first)",
  },
];

export const bookingStatus = [
  { id: uuidv4(), value: "All", label: "All" },
  { id: uuidv4(), value: "Pending", label: "Pending" },
  { id: uuidv4(), value: "Confirmed", label: "Confirmed" },
  { id: uuidv4(), value: "Booking not close", label: "Booking not close" },
];

export const bookingSortByOptions = [
  {
    id: uuidv4(),
    value: "startDate-desc",
    label: "Sort by date (recent first)",
  },
  {
    id: uuidv4(),
    value: "startDate-asc",
    label: "Sort by date (earlier first)",
  },
  {
    id: uuidv4(),
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  {
    id: uuidv4(),
    value: "totalPrice-asc",
    label: "Sort by amount (low first)",
  },
];

export const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

export const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

export const cabinSortByOptions = [
  {
    id: uuidv4(),
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    id: uuidv4(),
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    id: uuidv4(),
    value: "regularPrice-asc",
    label: "Sort by price (low first)",
  },
  {
    id: uuidv4(),
    value: "regularPrice-dsc",
    label: "Sort by price (high first)",
  },
  {
    id: uuidv4(),
    value: "maxCapacity-asc",
    label: "Sort by capacity (low first)",
  },
  {
    id: uuidv4(),
    value: "maxCapacity-dsc",
    label: "Sort by capacity (high first)",
  },
];
// utils/constants.ts
export const statusFilterOptions = [
  { value: "All", label: "All" },
  { value: "Available", label: "Available" },
  { value: "Booking", label: "Booking" },
];

export const driverFilterOptions = [
  { value: "All", label: "All" },
  { value: "Available", label: "Available" },
  { value: "Busy", label: "Busy" },
];
