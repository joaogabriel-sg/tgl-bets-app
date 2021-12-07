import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TextInput`
  ${({ theme }) => css`
    width: 100%;
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_700};
  `}
`;
