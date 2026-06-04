import arrowLeft from "@assets/arrowLeft.svg";
import styled from "@emotion/styled";

export default function GoBackButton() {
  return (
    <ButtonContainer>
      <ArrowLeftIcon src={arrowLeft} alt="뒤로가기" />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowLeftIcon = styled.img``;
