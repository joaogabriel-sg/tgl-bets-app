import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  margin: 24px 30px;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400_italic};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text_100};
    text-align: right;
  `}
`;
