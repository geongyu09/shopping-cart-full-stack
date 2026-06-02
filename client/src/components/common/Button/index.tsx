import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette";

const Button = styled.button`
  background-color: ${COLOR_PALETTE.black};
  color: ${COLOR_PALETTE.white};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  padding-block: 1.5rem;
`;

export default Button;
