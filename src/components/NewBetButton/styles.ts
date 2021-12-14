import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: 6px 12px;
  border-radius: 999px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    margin-right: 8px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.shape_light};
  `}
`;
