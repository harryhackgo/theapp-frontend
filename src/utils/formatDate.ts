import { formatDistanceToNow } from "date-fns";

export const formatLastSeen = (dateString: string | null): string => {
  return dateString
    ? formatDistanceToNow(new Date(dateString), { addSuffix: true })
    : "never";
};
