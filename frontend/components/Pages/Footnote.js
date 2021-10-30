import React from "react";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function FootNote({ showPullToRefresh }) {
  const Container = styled.View`
    align-self: center;
    align-content: center;
    justify-content: center;
    height: ${verticalScale(50)}px;
    margin-horizontal: auto;
    margin-top: ${verticalScale(40)}px;
    flex-direction: column;
  `;

  const Text = styled.Text`
    color: #818181;
    font-size: ${moderateScale(10)}px;
    text-align: center;
    margin-bottom: ${verticalScale(9)}px;
  `;

  return (
    <Container>
      {showPullToRefresh ? <Text>🔽 Pull down to refresh 🔽</Text> : null}
      {showPullToRefresh ? null : (
        <Text>สภานักเรียน'64 (นานาชาติคริสเตียนกรุงเทพ)</Text>
      )}
      {showPullToRefresh ? null : <Text>BCIS School Office: 02-322-1979</Text>}
    </Container>
  );
}
