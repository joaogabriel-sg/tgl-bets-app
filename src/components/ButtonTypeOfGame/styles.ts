import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isActive: boolean;
  color: string;
}

export const Container = styled.TouchableOpacity<Props>`
  ${({ theme, isActive, color }) => css`
    background: transparent;
    min-width: ${RFValue(120)}px;
    height: ${RFValue(34)}px;
    border-width: ${RFValue(2)}px;
    border-radius: 9999px;
    margin-right: 16px;
    border-color: ${color};

    align-items: center;
    justify-content: center;

    ${isActive &&
    css`
      background: ${color};
    `}
  `}
`;

export const Title = styled.Text<Props>`
  ${({ theme, isActive, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(14)}px;
    color: ${color};

    ${isActive &&
    css`
      color: ${theme.colors.shape_light};
    `}
  `}
`;
