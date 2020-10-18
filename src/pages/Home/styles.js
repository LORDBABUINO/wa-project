import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;

  input[type='text'] {
    margin-top: 10px;
    width: 200px;
    height: 30px;
    padding: 10px;
    font-size: 15px;
  }

  input[type='radio'] {
    margin-left: 5px;
    vertical-align: middle;
  }

  div {
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 200px;
    height: 30px;
    margin-top: 15px;
  }
`
