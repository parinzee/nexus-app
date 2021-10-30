import React from "react";
import styled from "styled-components";
import { WebView } from "react-native-webview";

export default function VerseOfWeek({ route }) {
  const { verse } = route.params;
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
  `;
  return (
    <Container>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: `https://www.biblegateway.com/passage/?search=${encodeURI(
            verse
          )}&version=NIV`,
        }}
      />
    </Container>
  );
}
