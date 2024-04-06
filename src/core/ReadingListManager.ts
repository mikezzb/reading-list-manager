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
    console.log(`Checking for expired items...`);
    console.log(`Items:`, this.items);
    const expiredItems = this.items.filter((item) =>
      this.expireManager.isExpired(item.creationTime)
    );
    for (const item of expiredItems) {
      console.log(`Removing expired item:`, item);
      if (!item.url) continue;
      console.log(`Rly Removing expired item: ${item.url}`);
      // await chrome.readingList.removeEntry({ url: item.url });
    }
  }
}
