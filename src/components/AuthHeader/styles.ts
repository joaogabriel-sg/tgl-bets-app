import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;

  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    width: 100%;
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(42)}px;
    color: ${theme.colors.text_700};
    text-align: center;
  `}
`;

export const HighlightedTitle = styled.Text`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    width: ${RFValue(144)}px;
    padding: 8px 0;
    border-radius: 9999999px;
    margin: 16px 0;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.shape_light};
    text-align: center;
  `}
`;

export const EmphasizedTitle = styled.Text`
  ${({ theme }) => css`
    width: 100%;
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(48)}px;
    color: ${theme.colors.text_700};
    text-align: center;
    text-transform: uppercase;
  `}
`;

export const ScreenTitle = styled.Text`
  ${({ theme }) => css`
    width: 100%;
    margin: 42px 0 30px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(28)}px;
    color: ${theme.colors.text_700};
    text-align: center;
  `}
`;
