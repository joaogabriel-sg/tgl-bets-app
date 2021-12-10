import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface BetCardProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const ScreenTitle = styled.Text`
  ${({ theme }) => css`
    margin-bottom: ${RFValue(30)}px;
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
    text-transform: uppercase;
  `}
`;

export const EmptyContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})``;

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

export const Content = styled.View`
  padding: ${RFValue(48)}px ${RFValue(16)}px ${RFValue(24)}px;

  flex: 1;
  align-items: center;
`;

export const BetWrapper = styled.View`
  width: 100%;
  margin-bottom: 30px;
  flex-direction: row;
`;

export const DetailLeft = styled.View<BetCardProps>`
  background: ${({ color }) => color};
  width: ${RFValue(6)}px;
  height: 100%;
  border-radius: 4px;
`;

export const BetDescription = styled.View`
  padding-left: 22px;
`;

export const BetNumbers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const BetDateAndPrice = styled.Text`
  ${({ theme }) => css`
    margin: 16px 0 12px;

    font-family: ${theme.fonts.primary_400_regular};
    font-size: ${RFValue(17)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const BetType = styled.Text<BetCardProps>`
  ${({ theme, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${color};
  `}
`;

export const NewBetButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 999px;

  flex-direction: row;
  align-items: center;

  position: absolute;
  right: ${RFValue(16)}px;
  bottom: ${RFValue(66)}px;
  z-index: 100;
`;

export const NewBetText = styled.Text`
  ${({ theme }) => css`
    margin-right: 8px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.shape_light};
  `}
`;
