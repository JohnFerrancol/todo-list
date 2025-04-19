import { format, isToday, isThisWeek } from "date-fns";

// Functions used to format the date for display and deformat date for data handling purposes
const formatDate = (date) => format(date, "dd MMM yyyy");
const deformatDate = (formattedDate) => format(formattedDate, "yyyy-MM-dd");

export { formatDate, isToday, isThisWeek, deformatDate };
