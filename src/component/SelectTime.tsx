import { ReactNode } from "react";
import styled from "styled-components";

const SelectTimeStyle = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

function SelectTime({ children }: { children: ReactNode }) {
  return <SelectTimeStyle>{children}</SelectTimeStyle>;
}

export default SelectTime;
