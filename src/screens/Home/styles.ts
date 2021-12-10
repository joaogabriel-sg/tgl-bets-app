import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";

import { IBet } from "../../store/slices/bets";
import { IBetType } from ".";

export const Container = styled.View`
  flex: 1;
`;

export const ScreenTitleContainer = styled.Text`
  margin-bottom: ${RFValue(30)}px;
`;

export const Content = styled.View`
  padding: ${RFValue(48)}px ${RFValue(16)}px ${RFValue(24)}px;

  flex: 1;
  align-items: center;
`;

export const InfoLegend = styled.Text`
  ${({ theme }) => css`
    margin-bottom: ${RFValue(24)}px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.primary};
  `}
`;

export const InfoMessage = styled.Text`
  ${({ theme }) => css`
    margin-top: ${RFValue(18)}px;

    font-family: ${theme.fonts.primary_400_italic};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
    text-align: center;
  `}
`;

export const FilterWrapper = styled.View`
  width: 100%;
  margin-bottom: 32px;
  align-items: center;
`;

export const FilterTitle = styled.Text`
  ${({ theme }) => css`
    margin-bottom: 12px;

    font-family: ${theme.fonts.primary_400_italic};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const BetTypeList = styled(
  FlatList as new (props: FlatListProps<IBetType>) => FlatList<IBetType>
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const BetList = styled(
  FlatList as new (props: FlatListProps<IBet>) => FlatList<IBet>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const NewBetButtonContainer = styled.View`
  width: ${RFValue(140)}px;

  position: absolute;
  right: ${RFValue(16)}px;
  bottom: ${RFValue(66)}px;
  z-index: 100;
`;
