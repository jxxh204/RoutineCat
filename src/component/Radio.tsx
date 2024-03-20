import styled from "styled-components";

const RadioWrapper = styled.div`
  display: flex;
`;
const RadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: gray;
  }
`;
const RadioLabel = styled.label`
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 10px 42px;
  background-color: white;
  border: 1px solid;
  font-size: 16px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.color.green[300]};
  }
`;

type Props = {
  children: string;
  name: string;
  id: string;
  onChange?: () => void;
};

function Radio({ children, name, id, onChange }: Props) {
  return (
    <RadioWrapper>
      <RadioInput type="radio" name={name} id={id} onChange={onChange} />
      <RadioLabel htmlFor={id}>{children}</RadioLabel>
    </RadioWrapper>
  );
}

export default Radio;
