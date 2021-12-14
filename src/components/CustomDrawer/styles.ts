import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  flex: 1;
`;

export const Header = styled.View`
  padding: 20px 12px;
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.shape_light};
  `}
`;

export const Email = styled.Text`
  ${({ theme }) => css`
    margin-top: 8px

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.shape_light};
  `}
`;

export const LogoutButtonWrapper = styled.View`
  padding: 20px;
`;

export const LogoutButton = styled(BorderlessButton)`
  width: 48px;
  height: 48px;

  align-items: center;
  justify-content: center;
`;
