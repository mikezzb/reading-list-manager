import PersistedStore from "./PersistedStore";
import { STORAGE_KEYS, TIME_UNIT_TO_MS } from "./config";

type ExpireConfig = {
  expireAfterValue?: number;
  expireAfterUnit?: string;
};

const defaultConfig: ExpireConfig = {
  expireAfterUnit: "day",
  expireAfterValue: 365,
};

const onLoadKeys = [
  STORAGE_KEYS.EXPIRE_AFTER_UNIT,
  STORAGE_KEYS.EXPIRE_AFTER_VALUE,
];

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
    return ExpireManager.getExpireDurationInMs(
      this.expireAfterUnit,
      this.expireAfterValue
    );
  }

  public setExpireValue(value: number) {
    // if value is negative, reset the input field to treat it as backspace
    this.setStore(STORAGE_KEYS.EXPIRE_AFTER_VALUE, value < 1 ? "" : value);
  }

  public setExpireUnit(unit: string) {
    this.setStore(STORAGE_KEYS.EXPIRE_AFTER_UNIT, unit);
  }

  public isExpired(timestamp: number): boolean {
    return ExpireManager.isExpired(
      timestamp,
      this.expireAfterUnit,
      this.expireAfterValue
    );
  }

  public static getExpireDurationInMs(
    expireAfterUnit: string,
    expireAfterValue: number
  ): number {
    return expireAfterValue * TIME_UNIT_TO_MS[expireAfterUnit];
  }

  public static isExpired(
    timestamp: number,
    expireAfterUnit?: string,
    expireAfterValue?: number
  ): boolean {
    // skip checking if not set
    if (!expireAfterUnit || !expireAfterValue) return false;
    const expireDurationInMs = ExpireManager.getExpireDurationInMs(
      expireAfterUnit,
      expireAfterValue
    );
    return Date.now() - timestamp > expireDurationInMs;
  }
}
