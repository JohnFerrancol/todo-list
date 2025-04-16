import { format, isToday, isThisWeek } from "date-fns";

const formatDate = (date) => format(date, "dd MMM yyyy");
const deformatDate = (formattedDate) => format(formattedDate, "yyyy-MM-dd");

export { formatDate, isToday, isThisWeek, deformatDate };
