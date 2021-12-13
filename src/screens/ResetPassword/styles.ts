import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
})`
  background: ${({ theme }) => theme.colors.background_primary};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${RFValue(48)}px 8px 0px;
`;

export const InputWrapper = styled.View`
  padding: 32px 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border_light};
`;
