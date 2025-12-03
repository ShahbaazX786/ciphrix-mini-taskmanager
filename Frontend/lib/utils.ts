import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { projectData } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAppName = () => {
  return projectData["appName"];
};

export const getFormattedDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[date.getMonth()];

  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day} ${monthName} ${year}, ${hours}:${minutes} ${ampm}`;
};

export const TableSortingFunction = (
  rowA: any,
  rowB: any,
  columnId: any
): any => {
  const a = rowA.getValue(columnId) as string;
  const b = rowB.getValue(columnId) as string;

  const numA = parseInt(a.match(/\d+/)?.[0] || "0");
  const numB = parseInt(b.match(/\d+/)?.[0] || "0");

  if (numA !== numB) return numA - numB;

  return a.localeCompare(b);
};

// Cookie helpers
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
