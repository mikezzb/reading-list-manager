import { ReadingListManager } from "./core/ReadingListManager";
import { EXPIRE_CHECK_INTERVAL } from "./core/config";
import { createPolling } from "./core/util";

const readingListManager = ReadingListManager.getInstance();
const cleanupSchedule = createPolling(readingListManager.clearExpiredItems, EXPIRE_CHECK_INTERVAL);

cleanupSchedule();
