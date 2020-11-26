import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


export default function Label(props){
    return(
        <View>
            <Text style={styles.label}>
                {props.msg}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label:{
        fontSize:18,
        color:'white',
    },
});