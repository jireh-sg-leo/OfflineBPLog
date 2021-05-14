import React, { useState } from 'react';
import { TouchableOpacity, View, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === 'ios' ? '#00000066' : 'transparent',
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
  }
});

// https://medium.com/@olinations/10-steps-to-convert-a-react-class-component-to-a-functional-component-with-hooks-ab198e0fa139

const DateAndTimePicker = props => {
  const [date, setDate] = useState(props.date);

  const { onClose, onChange } = props;

  //   useEffect(() => {

  //     onInputChange(id, inputState.value, inputState.isValid);
  // }, [date, onClose, onChange]);

  return (
      <TouchableOpacity style={styles.container} onPress={()=>{onClose(date)}}>
        {Platform.OS === 'ios' && (
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>{onClose(date)}}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        )}
        <DateTimePicker
          value={date}
          mode={props.mode} //default date, possible value 'time'
          display="default"
          onChange={(e, d) => {
            if (Platform.OS === 'ios') {
              setDate(d);
              onChange(d);
            } else {
              onClose(d);
            }
          }}
          style={{ backgroundColor: 'white' }}
        />
      </TouchableOpacity>
  );

}

export default DateAndTimePicker;