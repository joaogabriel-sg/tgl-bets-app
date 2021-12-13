import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScreenTitleContainer = styled.View`
  padding: ${RFValue(30)}px ${RFValue(16)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: RFValue(16),
  },
})`
  flex: 1;
`;

export const FieldWrapper = styled.View`
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  ${({ theme }) => css`
    margin-bottom: 8px;

    font-family: ${theme.fonts.primary_700_italic};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text_600};
  `}
`;

export const InputWrapper = styled.View`
  background: ${({ theme }) => theme.colors.background_primary};
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;

  ${Platform.OS === "android" &&
  css`
    elevation: 2;
  `}
`;
