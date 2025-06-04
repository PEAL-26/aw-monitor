import dayJS from "dayjs";
import "dayjs/locale/pt";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayJS.locale("pt");
dayJS.extend(duration);
dayJS.extend(relativeTime);

export const dayjs = dayJS;
