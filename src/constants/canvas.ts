//board style
export const GRID_SIZE = 70;
export const ZOOM_MIN_SCALE = 0.2;
export const ZOOM_MAX_SCALE = 1;
export const ZOOM_SPEED = 1.1;
export const BG_COLOR = '#262626';
export const GRID_COLOR = '#393939';
export const SELECT_COLOR = 'rgba(0, 122, 204, 0.3)';
export const SELECT_STROKE_COLOR = '#005A99';

//board node tag
export const BACKGROUND = 'BACKGROUND';
export const DRAG = 'DRAG';
export const PAINT = 'PAINT';
export const TRANSFORMER_RECT = 'TRANSFORMER_RECT';
export const SELECT_RECT = 'SELECT_RECT';

//node tag
export const NODE_TAG = 'NODE_TAG';
export const HEADER_TAG = 'HEADER_TAG';
export const BODY_TAG = 'BODY_TAG';
export const HEADER_TEXT_TAG = 'HEADER_TEXT_TAG';
export const PIN_CIRCLE_TAG = 'PIN_CIRCLE_TAG';
export const PIN_TEXT_TAG = 'PIN_TEXT_TAG';

//node style
export const NODE_HEADER_FILL_COLOR = '#2A9D8F';
export const NODE_BODY_FILL_COLOR = '#E0E0E0';
export const NODE_STROKE_COLOR = '#5A5A5A';
export const NODE__HEADER_TEXT_COLOR = '#D3D3D3';
export const NODE_WIDTH = 220;
export const NODE_HEADER_HEIGHT = 36;
export const NODE_BODY_HEIGHT = 100;
export const NODE_FONT_SIZE = 18;
export const NODE_ICON_SIZE = 20;
export const NODE_RADIUS = 6;

//pin style
export const PIN_GAP = 12;
export const TEXT_PIN_GAP = 5;
export const ICON_PIN_GAP = 2;
export const PIN_HEIGHT = 20;
export const PIN_TEXT_COLOR = '#262626';
export const PIN_COLOR = {
  ['string' as string]: '#C0392B',
  number: '#2980B9',
  unknown: '#7F8C8D',
};
