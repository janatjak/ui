import React, { Children, cloneElement, FC, isValidElement, ReactNode } from 'react';
import system from 'styled-system';

import useTheme from '../useTheme';
import convert from '../utils/convert';
import Flex, { FlexProps } from './Flex';
import Box from './Box';

export interface StackProps extends FlexProps {
  direction?: system.ResponsiveValue<'column' | 'row'>;
  dir?: system.ResponsiveValue<'column' | 'row'>;
  gap?: system.ResponsiveValue<number | string>;
  children: ReactNode[];

  align?: FlexProps['alignItems'];
  justify?: FlexProps['justifyContent'];
  wrap?: FlexProps['flexWrap'];
}

export type ExtendedStackProps = StackProps;

const Stack: FC<StackProps> = ({
  direction: _direction,
  dir: _dir,
  align,
  justify,
  wrap,
  gap,
  children,
  ...props
}) => {
  const { breakpoints } = useTheme();
  const { toArray, narrow } = convert(breakpoints);
  const isLast = (i: number) => children.length === i + 1;

  const direction = _direction ?? _dir ?? 'row';

  const getStyle = (
    dir: ('column' | 'row' | null)[],
    s: (number | string | null)[]
  ) => {
    const { mb, mr, maxWidth } = dir.reduce((acc, val, i) => ({
      mb: [...acc.mb, val === 'column' ? s[i] : 0],
      mr: [...acc.mr, val === 'row' ? s[i] : 0],
      maxWidth: [...acc.maxWidth, val === 'column' ? '100%' : null]
    }),
    {
      mb: [],
      mr: [],
      maxWidth: []
    } as { mb: (string | number | null)[]; mr: (string | number | null)[]; maxWidth: (string | number | null)[] });

    return {
      mb: narrow(mb),
      mr: narrow(mr),
      maxWidth: narrow(maxWidth)
    };
  };

  return (
    <Flex
      alignItems={align}
      justifyContent={justify}
      flexDirection={direction}
      flexWrap={wrap}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <Box {...getStyle(toArray(direction, false), toArray(gap, false))}>
          {child}
        </Box>
      ))}

    </Flex>
  );
};

export default Stack;
