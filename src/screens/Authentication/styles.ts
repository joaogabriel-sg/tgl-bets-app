import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background: ${({ theme }) => theme.colors.background_primary};
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${RFValue(48)}px 8px 0px;
`;

export const Form = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.shape_light};
    width: 100%;
    max-width: ${RFValue(352)}px;

    border: 1px solid ${theme.colors.border_dark};
    border-radius: 14px;
    overflow: hidden;

    ${Platform.OS === "android"
      ? css`
          elevation: 2;
        `
      : css`
          shadow-color: ${theme.colors.shape_dark};
          shadow-offset: {width: 0, height: 2};
          shadow-opacity: 0.25;
          shadow-radius: 2;
        `}
  `}
`;
