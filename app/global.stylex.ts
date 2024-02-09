import stylex from '@stylexjs/stylex';

export const flex = stylex.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const layout = stylex.create({
  default: {
    margin: '10px',
  },
});

export const button = stylex.create({
  default: {
    padding: '6px',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'lightgray',
    cursor: 'pointer',
  },
});
