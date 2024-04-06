import { ExpireManager } from "./ExpireManager";
import { STORAGE_KEYS } from "./config";
import { getItem } from "./storage";

export class ReadingListManager {
  private static instance: ReadingListManager;
  public items: Array<chrome.readingList.Entry> = [];

  private constructor() {
    this.clearExpiredItems = this.clearExpiredItems.bind(this);
  }

  public static getInstance(): ReadingListManager {
    if (!ReadingListManager.instance) {
      ReadingListManager.instance = new ReadingListManager();
    }
    return ReadingListManager.instance;
  }

  public async getLatestItems() {
    this.items = await chrome.readingList.query({});
    return this.items;
  }

  public async clearExpiredItems() {
    const paused = await getItem(STORAGE_KEYS.PAUSE_CLEANUP);
    if (paused) return;
    await this.getLatestItems();
    const expireAfterUnit = await getItem(STORAGE_KEYS.EXPIRE_AFTER_UNIT);
    const expireAfterValue = await getItem(STORAGE_KEYS.EXPIRE_AFTER_VALUE);
    const expiredItems = this.items.filter((item) =>
      ExpireManager.isExpired(item.creationTime, expireAfterUnit, expireAfterValue)
    );
    for (const item of expiredItems) {
      if (!item.url) continue;
      await chrome.readingList.removeEntry({ url: item.url });
    }
  }
}
