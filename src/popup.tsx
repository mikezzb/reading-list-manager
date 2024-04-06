import React, { useContext, useEffect, useState } from "react";
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
import { TIME_UNIT_OPTIONS } from "./core/config";
import { ExpireManager } from "./core/ExpireManager";

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
          min={1}
          value={expireManager!.expireAfterValue}
          onChange={(e) => expireManager!.setExpireValue(+e.target.value)}
        />
        <TimeUnitSelect
          onChange={(e) => expireManager!.setExpireUnit(e.target.value)}
        >
          {TIME_UNIT_OPTIONS.map((option, index) => (
            <TimeUnitOption
              key={index}
              value={option}
              selected={expireManager!.expireAfterUnit === option}
            >
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
