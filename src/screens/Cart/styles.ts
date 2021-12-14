import styled, { css } from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { ICartGame } from "../../shared/types";

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

export const Total = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400_regular};
    font-style: normal;
    font-weight: normal;
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_700};
  `}
`;

export const SaveButton = styled.TouchableOpacity`
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
