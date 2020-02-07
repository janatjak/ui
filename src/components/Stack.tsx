import React, { Children, cloneElement, FC, isValidElement, ReactNode } from 'react';
import system from 'styled-system';

import useTheme from '../useTheme';
import convert from '../utils/convert';
import Flex, { FlexProps } from './Flex';

export interface StackProps extends FlexProps {
  direction?: system.ResponsiveValue<'column' | 'row'>;
  spacing?: system.ResponsiveValue<number | string>;
  align?: FlexProps['alignItems'];
  justify?: FlexProps['justifyContent'];
  wrap?: FlexProps['flexWrap'];
  children: ReactNode[];
}

const Stack: FC<StackProps> = ({
  align,
  justify,
  wrap,
  direction = 'row',
  spacing = '0',
  children,
  ...props
}) => {
  const { breakpoints } = useTheme();
  const { toArray } = convert(breakpoints!);
  const isLast = (i: number) => children.length === i + 1;

  const getStyle = (
    dir: ('column' | 'row' | null)[],
    s: (number | string | null)[]
  ) =>
    dir.reduce((acc, val, i) => ({
      mb: [...acc.mb, val === 'column' ? s[i] : 0],
      mr: [...acc.mr, val === 'row' ? s[i] : 0],
      maxWidth: [...acc.maxWidth, val === 'column' ? '100%' : 'none']
    }), { mb: [], mr: [], maxWidth: [] } as { mb: (string | number | null)[]; mr: (string | number | null)[]; maxWidth: (string | number | null)[] });

  return (
    <Flex
      alignItems={align}
      justifyContent={justify}
      flexDirection={direction}
      flexWrap={wrap}
      {...props}
    >
      {Children.map(children, (child, index) =>
        isValidElement(child) && !isLast(index)
          ? cloneElement(child, getStyle(toArray(direction), toArray(spacing)))
          : child
      )}
    </Flex>
  );
};

export default Stack;
