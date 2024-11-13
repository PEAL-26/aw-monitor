import dayjs from "dayjs";
import "dayjs/locale/pt";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("pt");
dayjs.extend(duration);
dayjs.extend(relativeTime);

export { dayjs };
