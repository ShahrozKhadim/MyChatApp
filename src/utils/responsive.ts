import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Width percentage
export const widthPercentage = wp;

// Height percentage
export const heightPercentage = hp;

// Common responsive values
export const responsive = {
  // Padding and margins
  padding: {
    xs: widthPercentage('2%'),
    sm: widthPercentage('4%'),
    md: widthPercentage('6%'),
    lg: widthPercentage('8%'),
    xl: widthPercentage('10%'),
  },
  margin: {
    xs: widthPercentage('2%'),
    sm: widthPercentage('4%'),
    md: widthPercentage('6%'),
    lg: widthPercentage('8%'),
    xl: widthPercentage('10%'),
  },
  // Font sizes
  fontSize: {
    xs: widthPercentage('3%'),
    sm: widthPercentage('3.5%'),
    md: widthPercentage('4%'),
    lg: widthPercentage('4.5%'),
    xl: widthPercentage('5%'),
    xxl: widthPercentage('6%'),
  },
  // Common heights
  height: {
    button: heightPercentage('6%'),
    input: heightPercentage('6%'),
    header: heightPercentage('8%'),
    tabBar: heightPercentage('10%'),
  },
  // Common widths
  width: {
    full: widthPercentage('100%'),
    half: widthPercentage('50%'),
    third: widthPercentage('33.33%'),
    quarter: widthPercentage('25%'),
  },
};
