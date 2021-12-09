import styled, { css } from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { ICartGame } from "../../store/slices/cart";

interface CartGameProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px 16px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border_dark};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
    text-transform: uppercase;
  `}
`;

export const CloseCartButton = styled.TouchableOpacity``;

export const EmptyCartWrapper = styled.View`
  margin: 32px 0;

  flex: 1;
  align-items: center;
`;

export const EmptyCartMessage = styled.Text`
  ${({ theme }) => css`
    margin-top: 24px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.primary};
  `}
`;

export const CartGames = styled(
  FlatList as new (props: FlatListProps<ICartGame>) => FlatList<ICartGame>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 32px 0;
`;

export const CartGame = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const Details = styled.View<CartGameProps>`
  flex: 1;
  padding: 8px 0 8px 12px;
  border-left-width: ${RFValue(4)}px;
  border-left-color: ${({ color }) => color};
  border-top-left-radius: ${RFValue(4)}px;
  border-bottom-left-radius: ${RFValue(4)}px;
  margin-left: 12px;
`;

export const Numbers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.text_600};
    line-height: ${RFValue(20)}px;
  `}
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Type = styled.Text<CartGameProps>`
  ${({ theme, color }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(16)}px;
    color: ${color};
  `}
`;

export const Price = styled.Text`
  ${({ theme }) => css`
    margin-left: 14px;

    font-family: ${theme.fonts.primary_400_regular};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const Total = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400_regular};
    font-style: normal;
    font-weight: normal;
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
  `}
`;

export const SaveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.65,
})`
  background: ${({ theme }) => theme.colors.background_secondary};
  width: 100%;
  height: ${RFValue(96)}px;

  align-items: center;
  justify-content: center;
`;

export const SaveButtonText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(35)}px;
    color: ${theme.colors.success};
  `}
`;
