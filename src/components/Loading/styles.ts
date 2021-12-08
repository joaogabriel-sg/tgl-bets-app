import styled, { css } from "styled-components/native";
import { Platform } from "react-native";
import { transparentize } from "polished";

export const Container = styled.View`
  background: ${({ theme }) => transparentize(0.3, theme.colors.shape_light)};
  width: 100%;
  height: 100%;

  flex: 1;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;

  ${Platform.OS === "android" &&
  css`
    elevation: 999999;
  `}
`;
