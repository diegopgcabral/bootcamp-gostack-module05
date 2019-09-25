import styled, { keyframes, css } from 'styled-components';
import { darken, lighten } from 'polished';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: border 0.25s ease-out;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #00688b;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: ${lighten(0.05, '#00688b')};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    font-size: 16px;
    color: #333;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-content: center;
      justify-content: space-between;
    }

    & + li {
      border-top: 1px solid #eee;
    }

    li:last-child {
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
  }
`;

export const DetailsButton = styled.button`
  display: inline-block;
  align-content: center;
  background: #00688b;
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  height: 40px;
  box-shadow: 0 0 5px #777;
  transition: background 0.2s;

  a {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }

  &:hover {
    background: ${lighten(0.05, '#00688b')};
  }
`;

export const RemoveButton = styled.button`
  background: ${darken(0.3, 'tomato')};
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  height: 40px;
  margin-left: 5px;
  box-shadow: 0 0 5px #777;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${lighten(0.05, `${darken(0.3, 'tomato')}`)};
  }
`;

export const ClearButton = styled.button`
  background: #00688b;
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  min-height: 40px;
  box-shadow: 0 0 5px #777;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${lighten(0.05, '#00688b')};
  }
`;
