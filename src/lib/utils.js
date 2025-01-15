export const generateCalendarLinks = (eventDetails) => ({
  google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${eventDetails.startDate}/${eventDetails.endDate
    }&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&sf=true`,
  outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    eventDetails.title
  )}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&startdt=${eventDetails.startDate}&enddt=${eventDetails.endDate}`,
  yahoo: `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(
    eventDetails.title
  )}&desc=${encodeURIComponent(eventDetails.description)}&in_loc=${encodeURIComponent(eventDetails.location)}&st=${eventDetails.startDate}&et=${eventDetails.endDate}`,
  ics: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${encodeURIComponent(window.location.href)}
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`,
});


import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Separate utility functions for better organization
export const isCodeContent = (message) => {
  const codeIndicators = ["void", "{", ";", "function", "class", "const", "let", "var"];
  return codeIndicators.some(indicator => message.includes(indicator));
};

export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "N/A";

  try {
    const date = timestamp?.toDate
      ? timestamp.toDate()
      : typeof timestamp === "number"
        ? new Date(timestamp)
        : timestamp;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};