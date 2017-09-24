import React from 'react';
import { View, Text } from 'react-native';

const FormInput = ({ label, children }) => {
  const { labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      {children}
    </View>
  );
};

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { FormInput };
