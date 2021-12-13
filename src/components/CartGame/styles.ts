import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  color: string;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const Details = styled.View<Props>`
  flex: 1;
  padding: 8px 0 8px 12px;
  border-left-width: ${RFValue(4)}px;
  border-left-color: ${({ color }) => color};
  border-top-left-radius: ${RFValue(4)}px;
  border-bottom-left-radius: ${RFValue(4)}px;
  margin-left: 12px;
`;

export const Numbers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.text_600};
    line-height: ${RFValue(20)}px;
  `}
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Type = styled.Text<Props>`
  ${({ theme, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(16)}px;
    color: ${color};
  `}
`;

export const Price = styled.Text`
  ${({ theme }) => css`
    margin-left: 14px;

    font-family: ${theme.fonts.primary_400_regular};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text_600};
  `}
`;
