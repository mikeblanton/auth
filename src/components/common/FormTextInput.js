import React from 'react';
import { TextInput } from 'react-native';

const FormTextInput = (props) => (
    <TextInput
      {...props}
      style={styles.inputStyle}
    />
  );

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
};

export { FormTextInput };
