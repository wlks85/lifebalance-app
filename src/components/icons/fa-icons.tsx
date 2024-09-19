import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProperty} from './types';
import {getPath} from './data';
import {View, Text} from 'react-native';

const FaIcons = (props: SvgProperty) => {
  const {size, color, name} = props;
  const {d, viewBox} = getPath(name);
  if (!d) {
    return (
      <>
        <View style={{width: size, height: size}}>
          <Text style={{color}}>?</Text>
        </View>
      </>
    );
  }
  return (
    <Svg viewBox={viewBox} width={size} height={size} {...props}>
      <Path fill={color} d={d} {...props} />
    </Svg>
  );
};
export default FaIcons;
