import { useState, useEffect, useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StageDisplay, Timer, ControllButtons, Settings, Notification } from './Components';
import {ReactComponent as FocusIcon} from './Assets/icons/Focus.svg';
import {ReactComponent as BreakIcon} from './Assets/icons/Break.svg';
import {FormState, Stages} from './Assets/types';
import { 
  focusStage,
  shortBreakStage,
  longBreakStage,
  focusStageDark,
  shortBreakStageDark,
  longBreakStageDark,
} from './Assets/themes';

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

const initialStagesInfo = {
  [Stages.focus]: {
    label: "Focus",
    icon: FocusIcon,
    lengthInMinutes: 25,
    value: Stages.focus,
    theme: focusStage,
    darkTheme: focusStageDark,
  },
  [Stages.shortBreak]: {
    label: "Short Break",
    icon: BreakIcon,
    lengthInMinutes: 5,
    value: Stages.shortBreak,
    theme: shortBreakStage,
    darkTheme: shortBreakStageDark,
  },
  [Stages.longBreak]: {
    label: "Long Break",
    icon: BreakIcon,
    lengthInMinutes: 15,
    value: Stages.longBreak,
    theme: longBreakStage,
    darkTheme: longBreakStageDark,
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
  const [nextStageIndex, setNextStageIndex] = useState<number>(1);
  const [currentStage, setCurrentStage] = useState<Stages>(Stages.focus);
  const [isPlaying, toggleIsPlaying] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [stagesInfo, dispatch] = useReducer(reducer, initialStagesInfo);
  const [notificationsOn, setNotificationsOn] = useState<boolean>(true);
  const [notificationActive, toggleNotificationActive] = useState<boolean>(false);
  const [notificationTimeout, setNotificationTimeout] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);


  const stageSequence = [
    Stages.focus,
    Stages.shortBreak,
    Stages.focus,
    Stages.longBreak,
  ];

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    switch(currentStage) {
      case Stages.focus: {
        link.href = './faviconFocus.ico';
        break; 
      };
      case Stages.shortBreak: {
        link.href = './faviconShortBreak.ico';
        break; 
      };
      case Stages.longBreak: {
        link.href = './faviconLongBreak.ico';
        break; 
      };
      default: {
        link.href = './faviconFocus.ico';
      }
    }
  }, [currentStage]);

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

  const skipStage = () => {
    if(isPlaying) {
      toggleTimer();
    }

    if(notificationsOn) {
      toggleNotificationActive(true);
    } else {
      proceedToNextStage();
    }
  };

  const handleTimeout = () => {
    setNotificationTimeout(true);
    skipStage();
  };

  useEffect(() => {
    if(settingsOpen) {
      toggleIsPlaying(false);
    }
  }, [settingsOpen]);
  

  //TODO: create reusable toggle function ? 
  const toggleSettingsOpen = () => setSettingsOpen(!settingsOpen); 
  const closeSettings = (newValues: FormState) => {
    updateStageLength(newValues);
    setSettingsOpen(false);
  }

  const closeNotification = () => {
    proceedToNextStage();
    toggleNotificationActive(false);
  }

  const proceedToNextStage = () => {
    if(currentStageIndex == stageSequence.length - 1) {
      setCurrentStageIndex(0);
      setCurrentStage(stageSequence[0]);
      setNextStageIndex(1);
    } else {
      const nextStageI = currentStageIndex + 1;
      setCurrentStageIndex(nextStageI);
      setCurrentStage(stageSequence[nextStageI]);
      if(nextStageI == stageSequence.length-1) {
        setNextStageIndex(0);
      } else {
        setNextStageIndex(nextStageI + 1);
      }
    }
    setNotificationTimeout(false);
  }

  const toggleNotifications = () => setNotificationsOn(!notificationsOn);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={stagesInfo[currentStage][darkMode ? 'darkTheme' : 'theme']}>
      { settingsOpen 
        && 
        <Settings
          notifications={notificationsOn}
          toggleNotifications={toggleNotifications}
          darkTheme={darkMode}
          toggleDarkTheme={toggleDarkMode}
          values={{
            focusLength: stagesInfo[Stages.focus].lengthInMinutes,
            shortBreakLength: stagesInfo[Stages.shortBreak].lengthInMinutes,
            longBreakLength: stagesInfo[Stages.longBreak].lengthInMinutes,
          }}
          handleClose={closeSettings}
          theme={stagesInfo[currentStage].theme}
        />
      } 
      {
        notificationsOn && notificationActive
        &&
        <Notification
          isTimeout={notificationTimeout}
          handleClose={closeNotification}
          nextStage={stagesInfo[stageSequence[nextStageIndex]].label}
          nextStageIcon={stagesInfo[stageSequence[nextStageIndex]].icon}
        />
      }
      <AppWrapper blured={settingsOpen || notificationActive}>
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


//TODO: 
// - mobile styles
// - code cleanup

// TIME: 
// 23.05 - start 11:00 - end 14:00 = 0300
// 23.05 - start 15:30 - end 16:45 = 0115
// 23.05 - start 19:45 - end 20:00 = 0015
// 23.05 - start 20:15 - end 20:30 = 0015  = 0445

// 24.05 - start 12:00 - end 13:15 = 0115
// 24.05 - start 14:00 - end 14:15 = 0015
// 24.05 - start 15:45 - end 16:00 = 0015
// 24.05 - start 16:45 - end 18:15 = 0130  = 0215

// 25.05 - start 11:15 - end 12:00 = 0045
// 25.05 - start 12:15 - end 13:30 = 0115  
// 25.05 - start 15:30 - end 15:45 = 0015  
// 25.05 - start 16:00 - end 17:00 = 0100  = 0315

// 26.05 - start 13:30 - end 13:45 = 0015
// 26.05 - start 14:45 - end 15:30 = 0045
// 26.05 - start 16:15 - end 17:00 = 0045  = 0145

// 27.05 - start 13:15 - end 13:45 = 0030
// 27.05 - start 14:30 - end 15:00 = 0030  = 0100

// 28.05 - start 15:30 - end 16:00 = 0030  = 0030

// 29.05 - start 11:15 - end 

