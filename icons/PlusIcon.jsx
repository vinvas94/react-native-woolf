import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ fill = '#FF6C00', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M7 0H6v6H0v1h6v6h1V7h6V6H7V0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PlusIcon;
