import styled from "styled-components";

export const Box = styled.div`
  background: #ffff;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 10px;
  border: 3px solid #5FE0F9;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  
  /* CSS Pré-Pronto */  
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }

  .msgComunidade {
    color: #559E22;
    font-size: 15px;
    margin-top: -12px;
    margin-left: 10px;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input, textarea{
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #717171;
      opacity: 1;
    }
  }
  textarea {
    font-family: sans-serif ;
    resize: vertical;
    max-block-size: 140px;
    height: 100px;
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #0B0101;
    margin-top: 12px;
  }
  ul {
    list-style: none;
  }

  .comments{
    margin-top: 20px;
    background-color: #EAE45F;
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.1);
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    padding: 16px;
  }
  
  .success {
    color: #559E22;
    font-size: 15px;
    margin-top: -12px;
    margin-left: 30px;
  
  }
  
`;

export default Box