import React from 'react';
import styled from 'styled-components';

const GradientWrapper = styled.div`
  position: 'relative';
  background-image: ${(p) => p.$imageStr};
  padding: ${(p) => p.$borderWidth}px;
  border-radius: ${(p) => p.$borderRadius}px;
`;

const GradientBorderBox = ({
  imageStr,
  borderWidth = 2.5,
  borderRadius,
  children,
  ...rest
}) => {
  return (
    <GradientWrapper
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $imageStr={imageStr}
      {...rest}
    >
      {children}
    </GradientWrapper>
  );
};

export default GradientBorderBox;
