import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Caption,
  Header,
  PopupWrapper,
  TimeConfigRow,
  TimeInput,
  TimeUnitOption,
  TimeUnitSelect,
} from "./ui";
import { STORAGE_KEYS, TIME_UNIT_OPTIONS } from "./core/config";
import { ExpireManager } from "./core/ExpireManager";
import { setItem } from "./core/storage";

const pauseCleanup = () => setItem(STORAGE_KEYS.PAUSE_CLEANUP, "true");
const resumeCleanup = () => setItem(STORAGE_KEYS.PAUSE_CLEANUP, "");

const Popup = () => {
  const expireManager = ExpireManager.getInstance();
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const update = () => forceUpdate({});
    expireManager!.subscribe(update);
    return () => expireManager!.unsubscribe(update);
  }, [expireManager]);

  return (
    <PopupWrapper>
      <Header>Reading List Manager</Header>
      <Caption>Your reading list links will expire (be deleted) after:</Caption>
      <TimeConfigRow>
        <TimeInput
          type="number"
          value={expireManager!.expireAfterValue}
          onChange={(e) => expireManager!.setExpireValue(+e.target.value)}
          onFocus={pauseCleanup}
          onBlur={resumeCleanup}
        />
        <TimeUnitSelect
          onChange={(e) => expireManager!.setExpireUnit(e.target.value)}
          value={expireManager!.expireAfterUnit}
          onFocus={pauseCleanup}
          onBlur={resumeCleanup}
        >
          {TIME_UNIT_OPTIONS.map((option, index) => (
            <TimeUnitOption key={index} value={option}>
              {option}
            </TimeUnitOption>
          ))}
        </TimeUnitSelect>
      </TimeConfigRow>
    </PopupWrapper>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
