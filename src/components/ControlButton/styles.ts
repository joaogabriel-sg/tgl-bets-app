import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface Props {
  isOutlined?: boolean;
}

export const ButtonOpacity = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<Props>`
  ${({ theme, isOutlined }) => css`
    background: ${theme.colors.success};
    min-height: ${RFValue(52)}px;
    border-width: ${RFValue(1)}px;
    border-color: transparent;
    border-radius: 10px;

    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${isOutlined &&
    css`
      background: transparent;
      border-color: ${theme.colors.success};
    `}
  `}
`;

export const ButtonNative = styled(RectButton)<Props>`
  ${({ theme }) => css`
    background: ${theme.colors.success};
    min-height: ${RFValue(52)}px;
    border-width: ${RFValue(1)}px;
    border-color: transparent;
    border-radius: 10px;

    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;

export const Title = styled.Text<Props>`
  ${({ theme, isOutlined }) => css`
    margin-left: 16px;

    font-family: ${theme.fonts.primary_700_regular};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.shape_light};

    ${isOutlined &&
    css`
      margin-left: 0;
      font-family: ${theme.fonts.primary_400_regular};
      color: ${theme.colors.success};
    `}
  `}
`;
