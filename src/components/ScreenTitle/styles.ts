import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
    text-transform: uppercase;
  `}
`;
