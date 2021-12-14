import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { ITypeOfGame } from "@shared/types";

export const Container = styled.View`
  flex: 1;
`;

export const ScreenTitleContainer = styled.View`
  padding: ${RFValue(30)}px ${RFValue(16)}px;
`;

export const ScreenTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
    text-transform: uppercase;
  `}
`;

export const TypeOfGame = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400_italic};
    font-weight: normal;
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
  `}
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: RFValue(16),
  },
})``;

export const SectionTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const Games = styled(
  FlatList as new (props: FlatListProps<ITypeOfGame>) => FlatList<ITypeOfGame>
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
  margin-bottom: 36px;
`;

interface GameButtonProps {
  active: boolean;
  color: string;
}

export const GameButton = styled.TouchableOpacity<GameButtonProps>`
  ${({ active, color }) => css`
    background: ${active ? color : "transparent"};
    min-width: ${RFValue(120)}px;
    height: ${RFValue(34)}px;

    border-width: ${RFValue(2)}px;
    border-color: ${color};
    border-radius: 9999px;

    margin-right: 16px;

    align-items: center;
    justify-content: center;
  `}
`;

export const GameButtonTitle = styled.Text<GameButtonProps>`
  ${({ theme, active, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(14)}px;
    color: ${active ? theme.colors.shape_light : color};
  `}
`;

export const GameDescription = styled.Text`
  ${({ theme }) => css`
    margin-top: 4px;

    font-family: ${theme.fonts.primary_400_italic};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_600};
    line-height: ${RFValue(24)}px;
  `}
`;

export const Numbers = styled.View`
  width: 100%;
  padding-top: 28px;

  flex-direction: row;
  flex-wrap: wrap;
`;

interface NumberButtonProps {
  active: boolean;
  color: string;
}

export const NumberButton = styled.TouchableOpacity<NumberButtonProps>`
  ${({ theme, active, color }) => css`
    background: ${active ? color : theme.colors.shape_medium};
    width: ${RFValue(64)}px;
    height: ${RFValue(64)}px;
    border-radius: 999999px;
    margin-right: 12px;
    margin-bottom: 12px;

    align-items: center;
    justify-content: center;
  `}
`;

export const NumberText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.shape_light};
  `}
`;

export const ControlButtonsContainer = styled.View`
  padding: 12px 0 32px;
`;

export const ControlButtonWrapper = styled.View`
  margin-bottom: 12px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(26)}px;
  color: ${({ theme }) => theme.colors.shape_light};
`;

export const OpenCartButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.success};
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;

  align-items: center;
  justify-content: center;

  position: absolute;
  right: ${RFValue(16)}px;
  bottom: ${RFValue(58)}px;
  z-index: 999;

  ${Platform.OS === "android" &&
  css`
    elevation: 5;
  `}
`;
