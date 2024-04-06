import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dropdown } from "./ui/Dropdown";
import { ExpireManagerContext, ExpireManagerProvider } from "./core/context";
import { TIME_UNIT_OPTIONS, DEFAULT_TIME_UNIT } from "./core/config";
import styled from "styled-components";

// input styled component for time value with material ui like style
const TimeInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Popup = () => {
  const expireManager = useContext(ExpireManagerContext);
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const update = () => forceUpdate({});
    expireManager!.subscribe(update);
    return () => expireManager!.unsubscribe(update);
  }, [expireManager]);

  return (
    <div>
      <h1>Popup</h1>
      <TimeInput
        type="number"
        min={1}
        value={expireManager!.expireAfterValue}
        onChange={(e) => expireManager!.setExpireValue(+e.target.value)}
      />
      <Dropdown
        options={TIME_UNIT_OPTIONS}
        selectedOption={expireManager!.expireAfterUnit}
        onSelect={expireManager!.setExpireUnit}
      />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ExpireManagerProvider>
      <Popup />
    </ExpireManagerProvider>
  </React.StrictMode>
);
