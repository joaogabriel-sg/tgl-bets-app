import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border_light};
`;
