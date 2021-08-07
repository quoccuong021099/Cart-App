import { Typography, withStyles } from '@material-ui/core';

/* cắt chữ theo số dòng */
export const TypographyLineClamp = withStyles(
  () => ({
    root: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': props => props.line,
    },
  }),
  { name: 'AtomTypographyLineClamp' },
)(Typography);

export default TypographyLineClamp;
