import React, { FC } from 'react';
import styled from 'styled-components';

import { boxBase, BoxBaseProps } from '../bases';
import { compose } from '../utils/baseStyle';
import Flex from './Flex';

export type AspectRatioProps = {
  ratio: number;
} & BoxBaseProps;

const AspectRatioStyle = styled.div<BoxBaseProps>`
  ${compose(boxBase)}

  & > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  img {
    object-fit: cover;
  }
`;

const AspectRatio: FC<AspectRatioProps> = ({ ratio, children, ...props }) => {
  return (
    <AspectRatioStyle
      width="100%"
      height={0}
      pb={ratio * 100 + '%'}
      position="relative"
      {...props}
    >
      <Flex
        position="absolute"
        alignItems="center"
        justifyContent="center"
        left={0}
        top={0}
      >
        {children}
      </Flex>
    </AspectRatioStyle>
  );
};

export default AspectRatio;
