import PersistedStore from "./PersistedStore";
import { day2min, min2ms } from "./util";

type ExtensionConfig = {
  expireAfterInMins?: number;
}

const defaultConfig: ExtensionConfig = {
  expireAfterInMins: day2min(7)
}

const onLoadKeys = ["expireAfterInMins"];
const onResetKeys = ["expireAfterInMins"];

export class ExpireManager extends PersistedStore {
  private static instance: ExpireManager;

  private constructor() {
    super(onLoadKeys, onResetKeys, defaultConfig);
  }

  public static getInstance(): ExpireManager {
    if (!ExpireManager.instance) {
      ExpireManager.instance = new ExpireManager();
    }
    return ExpireManager.instance;
  }

  public get expireDurationInMs() {
    return min2ms(this.expireAfterInMins);
  }

  public set expireAfterInMins(value: number) {
    this.setStore("expireAfterInMins", value);
  }

  public isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.expireDurationInMs;
  }
}
