import React, { memo } from "react";

const CalendarButton = memo(({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors duration-200 flex items-center space-x-2"
  >
    {children}
  </button>
));

CalendarButton.displayName = "CalendarButton";

export default CalendarButton;
