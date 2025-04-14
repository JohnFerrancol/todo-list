import { format, isToday, isThisWeek } from "date-fns";

const formatDate = (date) => format(date, "dd MMM yyyy");

export { formatDate, isToday, isThisWeek };
