import { useState } from 'react';
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
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<Stages>(Stages.focus);
  
  const stageSequence = [
    Stages.focus,
    Stages.shortBreak,
    Stages.focus,
    Stages.longBreak,
  ];

  const stagesInfo = {
    [Stages.focus]: {
      label: "Focus",
      icon: FocusIcon,
      lengthInMinutes: 25,
      value: Stages.focus,
    },
    [Stages.shortBreak]: {
      label: "Short Break",
      icon: BreakIcon,
      lengthInMinutes: 5,
      value: Stages.shortBreak,
    },
    [Stages.longBreak]: {
      label: "Long Break",
      icon: BreakIcon,
      lengthInMinutes: 15,
      value: Stages.longBreak,
    }
  }

  //TODO: add notification when skiping stage
  const skipStage = () => {
    if(currentStageIndex == stageSequence.length - 1) {
      setCurrentStageIndex(0);
      setCurrentStage(stageSequence[0]);
    } else {
      const nextStageIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextStageIndex);
      setCurrentStage(stageSequence[nextStageIndex]);
    }
  };

  return (
    <AppWrapper>
      <StageDisplay Icon={stagesInfo[currentStage].icon} stage={stagesInfo[currentStage].label}/>
      <Timer time={stagesInfo[currentStage].lengthInMinutes}/>
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