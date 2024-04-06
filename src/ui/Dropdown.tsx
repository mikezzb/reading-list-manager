import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};
