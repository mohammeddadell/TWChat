import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const WINDOW = {
  WIDTH: SCREEN_WIDTH,
  HEIGHT: SCREEN_HEIGHT,
 
  MODAL_WIDTH_RATIO: 0.9,
  MODAL_HEIGHT_RATIO: 0.5,
  MESSAGE_IMAGE_RATIO: 0.6,
  BUTTON_SIZE: Math.min(SCREEN_WIDTH * 0.1, 40),
}; 