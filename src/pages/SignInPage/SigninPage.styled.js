import styled from 'styled-components';

export const StyledSection = styled.section`
  height: calc(100vh - 60px);

  position: relative;
`;
export const LoginWrapper = styled.div`
  @media only screen and (min-width: 1440px) {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
  }
`;
export const ImgWrapper = styled.div`
  text-align: center;

  @media only screen and (min-width: 768px) {
    position: absolute;
    right: -5%;
    top: 0;
  }
  @media only screen and (min-width: 1440px) {
    position: static;
    margin-left: -298px;
  }
`;

export const ErrorSpan = styled.span`
  position: absolute;
  bottom: -24px;
  color: #ef5050;
  font-size: 14px;
`;
