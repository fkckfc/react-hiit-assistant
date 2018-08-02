import styled from 'styled-components';
import React from 'react';

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1.0rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
  background-color: lavender;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #0095ff;
    outline: none;
    box-shadow: 0 1px 6px rgba(103, 114, 229, 0.5);
  }
  &:hover {
    background-color: #ddeaff;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Button = styled.button`
  display: block;
  background-color: ${props => (props.disabled ? '#BBB' : 'cornflowerblue')};
  !display: ${props => (props.disabled ? 'none' : 'block')};
  color: white;
  border: none;
  width: 100%;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  text-transform: uppercase;
  position: relative;
  margin: 1rem 1.5rem;
  transition: all ease 0.1s;
  &:hover {
    background-color: ${props => (props.disabled ? '#BBB' : '#1f70f2')};
  }
`;

export function Clock(props) {
  return (      
    <div className={props.isActiveTick ? ' clock activeClock' : 'clock restClock'}>      
        {props.children}      
    </div>
  );  
}

export function NumericInput (props) { 
  let handleChange = (e) => {
    props.onValueChange(e.target.value, e.target.name);
  }
    
  return (
    <Input onChange={handleChange} 
      value={props.inputValue}
      placeholder={props.inputLabel}
      name={props.name}/>
  );  
}