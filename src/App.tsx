import React from 'react';
import styled from 'styled-components';
import { StageDisplay, Timer, ControllButtons } from './Components';
import {ReactComponent as FocusIcon} from './Icons/Focus.svg';
import {ReactComponent as BreakIcon} from './Icons/Break.svg';


const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF2F2;
`;


enum Stages {
  focus,
  shortBreak,
  longBreak,
}

// TODO: store stages as enums? strings + icon
function App() {

  const defaultState = {
    stage: 'Focus',
    time: 45,
    icon: FocusIcon
  };

  const skipStage = () => {
    console.log('SKIP');
  }

  return (
    <AppWrapper>
      <StageDisplay Icon={defaultState.icon} stage={defaultState.stage}/>
      <Timer time={defaultState.time}/>
      <ControllButtons handleSkipStage={skipStage}/>
    </AppWrapper>
  );
}

export default App;


//TODO: add conditional favicon & change it dependign on app state

//TODO: basic view components:
// - state display component
// - timer 
// - buttons :
//    + settings
//    + play/pause
//    + skip stage


// TIME: 
// 23.05 - start 11:00 