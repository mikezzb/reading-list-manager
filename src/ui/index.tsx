import styled from "styled-components";

export const Header = styled.div`
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 190px;
  margin: 28px;
  --caption-color: rgba(0, 0, 0, 0.6);
`;

export const TimeConfigRow = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const TimeInputContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const TimeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border-radius: 5px 0 0 5px;
  border-width: 1px 0 1px 1px;
  border-color: rgba(0, 0, 0, 0.2);
  padding: 4px 10px;
  box-sizing: border-box;
  height: 36px;
  flex: 1;
  width: 100%;
`;

export const TimeUnitSelect = styled.select`
  outline: none;
  background-color: #f8f8f8;
  border-radius: 0 5px 5px 0;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(0, 0, 0, 0.2);
  width: 70px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const TimeUnitOption = styled.option``;

export const Caption = styled.div`
  color: var(--caption-color);
  font-size: 0.93em;
`;
