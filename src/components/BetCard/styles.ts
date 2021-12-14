import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: 30px;
  flex-direction: row;
`;

export const DetailLeft = styled.View<Props>`
  background: ${({ color }) => color};
  width: ${RFValue(6)}px;
  height: 100%;
  border-radius: 4px;
`;

export const Description = styled.View`
  padding-left: 22px;
`;

export const Numbers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const DateAndPrice = styled.Text`
  ${({ theme }) => css`
    margin: 16px 0 12px;

    font-family: ${theme.fonts.primary_400_regular};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const Type = styled.Text<Props>`
  ${({ theme, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${color};
  `}
`;
