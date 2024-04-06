import { ExpireManager } from "./ExpireManager";

export class ReadingListManager {
  private static instance: ReadingListManager;
  public items: Array<chrome.readingList.Entry> = [];
  private expireManager: ExpireManager = ExpireManager.getInstance();

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
    await this.getLatestItems();
    const expiredItems = this.items.filter((item) => this.expireManager.isExpired(item.creationTime));
    for (const item of expiredItems) {
      await chrome.readingList.removeEntry({ id: item.id });
    }
  }
}