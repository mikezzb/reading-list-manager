import { ReadingListManager } from "./core/ReadingListManager";
import { ALARM_NAME } from "./core/config";

const readingListManager = ReadingListManager.getInstance();

// register alarm to clear expired items
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== "install") {
    return;
  }

  await chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
});

// on alarm fired, clear expired items
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    await readingListManager.clearExpiredItems();
  }
});
