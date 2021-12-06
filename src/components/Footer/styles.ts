import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  height: ${RFValue(82)}px;
  padding: 8px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border_dark};
  margin-top: auto;

  align-items: center;
  justify-content: center;
`;

export const Copyright = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400_regular};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text_700};
    text-align: center;
  `}
`;
