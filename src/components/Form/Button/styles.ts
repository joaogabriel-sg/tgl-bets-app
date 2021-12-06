import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isPrimary?: boolean;
}

export const Container = styled.View`
  width: 100%;
  padding: 32px 0;

  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<Props>`
  ${({ theme, isPrimary }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(28)}px;
    color: ${isPrimary ? theme.colors.primary : theme.colors.text_700};
  `}
`;

export const Icon = styled(Feather)<Props>`
  margin-left: 16px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme, isPrimary }) =>
    isPrimary ? theme.colors.primary : theme.colors.text_700};
`;
