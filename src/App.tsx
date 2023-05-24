import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StageDisplay, Timer, ControllButtons } from './Components';
import {ReactComponent as FocusIcon} from './Assets/icons/Focus.svg';
import {ReactComponent as BreakIcon} from './Assets/icons/Break.svg';
import {focusStage, shortBreakStage, longBreakStage} from './Assets/themes';

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colours.backgound};
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
  const [isPlaying, toggleIsPlaying] = useState<boolean>(false);

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
      theme: focusStage,
    },
    [Stages.shortBreak]: {
      label: "Short Break",
      icon: BreakIcon,
      lengthInMinutes: 5,
      value: Stages.shortBreak,
      theme: shortBreakStage,
    },
    [Stages.longBreak]: {
      label: "Long Break",
      icon: BreakIcon,
      lengthInMinutes: 15,
      value: Stages.longBreak,
      theme: longBreakStage,
    }
  }


  const toggleTimer = () => toggleIsPlaying(!isPlaying);

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

  //TODO: trigger popup for stage change when time is out
  const handleTimeout = () => {
    alert('timeout');
    toggleTimer();
    skipStage();
  }


  return (
    <ThemeProvider theme={stagesInfo[currentStage].theme}>
      <AppWrapper>
        <StageDisplay Icon={stagesInfo[currentStage].icon} stage={stagesInfo[currentStage].label}/>
        <Timer
          time={stagesInfo[currentStage].lengthInMinutes}
          isActive={isPlaying}
          handleTimeout={handleTimeout}
        />
        <ControllButtons
          handlePlayBtn={toggleTimer}
          handleSkipStage={skipStage}
          isPlaying={isPlaying}
        />
      </AppWrapper>
    </ThemeProvider>
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
// 23.05 - start 11:00 - end 14:00 = 0300
// 23.05 - start 15:30 - end 16:45 = 0115
// 23.05 - start 19:45 - end 20:00 = 0015
// 23.05 - start 20:15 - end 20:30 = 0015

// 24.05 - start 12:00 - end 
