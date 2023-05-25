import { useState, useEffect, useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StageDisplay, Timer, ControllButtons, Settings } from './Components';
import {ReactComponent as FocusIcon} from './Assets/icons/Focus.svg';
import {ReactComponent as BreakIcon} from './Assets/icons/Break.svg';
import {focusStage, shortBreakStage, longBreakStage} from './Assets/themes';
import {FormState} from './Assets/types';

interface StyleProps {
  blured: boolean;
}

const AppWrapper = styled.div<StyleProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colours.backgound};
  filter: ${props => props.blured ? 'blur(3px)':'none'};
`;


enum Stages {
  focus,
  shortBreak,
  longBreak,
}

const initialStagesInfo = {
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

const reducer = (initialStagesInfo: any, action: any) => {
  return {
      ...initialStagesInfo,
      [action.key]: {
        ...initialStagesInfo[action.key],
        lengthInMinutes: action.value,
      },
  }
}

function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<Stages>(Stages.focus);
  const [isPlaying, toggleIsPlaying] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [stagesInfo, dispatch] = useReducer(reducer, initialStagesInfo);

  const stageSequence = [
    Stages.focus,
    Stages.shortBreak,
    Stages.focus,
    Stages.longBreak,
  ];

  const toggleTimer = () => toggleIsPlaying(!isPlaying);

  const updateStageLength = (newValues: FormState) => {
    dispatch({
      key: Stages.focus,
      value: newValues.focusLength,
    });
    dispatch({
      key: Stages.shortBreak,
      value: newValues.shortBreakLength,
    });
    dispatch({
      key: Stages.longBreak,
      value: newValues.longBreakLength,
    });
  }

  //TODO: add notification when skiping stage
  const skipStage = () => {
    if(isPlaying){
      toggleTimer();
    }

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
    skipStage();
  }

  useEffect(() => {
    if(settingsOpen) {
      toggleIsPlaying(false);
    }
  }, [settingsOpen]);
  
  const toggleSettingsOpen = () => setSettingsOpen(!settingsOpen); 
  const closeSettings = (newValues: FormState) => {
    updateStageLength(newValues);
    setSettingsOpen(false);
  }
  return (
    <ThemeProvider theme={stagesInfo[currentStage].theme}>
      { settingsOpen 
        && 
        <Settings
          values={{
            focusLength: stagesInfo[Stages.focus].lengthInMinutes,
            shortBreakLength: stagesInfo[Stages.shortBreak].lengthInMinutes,
            longBreakLength: stagesInfo[Stages.longBreak].lengthInMinutes,
          }}
          handleClose={closeSettings}
          theme={stagesInfo[currentStage].theme}
        />
      } 
      <AppWrapper blured={settingsOpen}>
        <StageDisplay Icon={stagesInfo[currentStage].icon} stage={stagesInfo[currentStage].label}/>
        <Timer
          time={stagesInfo[currentStage].lengthInMinutes}
          isActive={isPlaying}
          handleTimeout={handleTimeout}
        />
        <ControllButtons
          openSettings={toggleSettingsOpen}
          handlePlayBtn={toggleTimer}
          handleSkipStage={skipStage}
          isPlaying={isPlaying}
          areDisabled={settingsOpen}
        />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;


//TODO: add conditional favicon & change it dependign on app state

//TODO: basic view components:
// - buttons :
//    + settings


// TIME: 
// 23.05 - start 11:00 - end 14:00 = 0300
// 23.05 - start 15:30 - end 16:45 = 0115
// 23.05 - start 19:45 - end 20:00 = 0015
// 23.05 - start 20:15 - end 20:30 = 0015  = 0445

// 24.05 - start 12:00 - end 13:15 = 0115
// 24.05 - start 14:00 - end 14:15 = 0015
// 24.05 - start 15:45 - end 16:00 = 0015
// 24.05 - start 16:45 - end 18:15 = 0115  = 0200

// 25.05 - start 11:15 - end 12:00 = 0045
// 25.05 - start 12:15 - end 



