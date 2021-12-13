import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
`;

export const ErrorMessage = styled.Text`
  ${({ theme }) => css`
    margin-top: 4px;

    font-family: ${theme.fonts.primary_400_italic};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.error};
  `}
`;
