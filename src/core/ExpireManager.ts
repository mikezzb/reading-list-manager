import PersistedStore from "./PersistedStore";
import { TIME_UNIT_TO_MS } from "./config";

type ExpireConfig = {
  expireAfterValue?: number;
  expireAfterUnit?: string;
};

const defaultConfig: ExpireConfig = {
  expireAfterUnit: "day",
  expireAfterValue: 7,
};

const onLoadKeys = ["expireAfterUnit", "expireAfterValue"];
const onResetKeys = onLoadKeys;

export class ExpireManager extends PersistedStore {
  private static instance: ExpireManager;
  public expireAfterValue: number = defaultConfig.expireAfterValue as number;
  public expireAfterUnit: string = defaultConfig.expireAfterUnit as string;

  private constructor() {
    super(onLoadKeys, onResetKeys, defaultConfig);
    this.setExpireUnit = this.setExpireUnit.bind(this);
    this.setExpireValue = this.setExpireValue.bind(this);
  }

  public static getInstance(): ExpireManager {
    if (!ExpireManager.instance) {
      ExpireManager.instance = new ExpireManager();
    }
    return ExpireManager.instance;
  }

  public get expireDurationInMs() {
    return this.expireAfterValue * TIME_UNIT_TO_MS[this.expireAfterUnit];
  }

  public setExpireValue(value: number) {
    // validation
    if (value < 1) {
      value = 1;
    }
    this.setStore("expireAfterValue", value);
  }

  public setExpireUnit(unit: string) {
    this.setStore("expireAfterUnit", unit);
  }

  public isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.expireDurationInMs;
  }
}
