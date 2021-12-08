import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  height: ${RFValue(94)}px;
  padding: ${RFValue(32)}px ${RFValue(16)}px 0;
  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border_light};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const LogoWrapper = styled.View`
  position: relative;
  height: 100%;
`;

export const Logo = styled.Text`
  ${({ theme }) => css`
    width: ${RFValue(100)}px;
    text-align: center;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(44)}px;
    color: ${theme.colors.text_700};
  `}
`;

export const LogoDetail = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(7)}px;
  border-radius: 9999px;

  position: absolute;
  bottom: -${RFValue(3.5)}px;
`;

export const MenuButton = styled(BorderlessButton)``;
