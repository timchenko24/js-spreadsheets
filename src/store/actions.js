import {
  APPLY_STYLE, CELL_TEXT,
  CURRENT_STYLES, LAST_OPEN, TABLE_NAME, TABLE_RESIZE,
} from '@/store/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function cellText(data) {
  return {
    type: CELL_TEXT,
    data,
  };
}

export function cellStyles(data) {
  return {
    type: CURRENT_STYLES,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: TABLE_NAME,
    data,
  };
}

export function updateDate() {
  return {
    type: LAST_OPEN,
  };
}
