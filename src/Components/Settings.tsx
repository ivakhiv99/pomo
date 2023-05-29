import { FC, useEffect, useReducer } from 'react';
import styled from "styled-components";
import CustomIcon from './utils/IconWrapper';
import { ReactComponent as Close } from '../Assets/icons/Close.svg';
import IosSwitchMaterialUi from 'ios-switch-material-ui';
import Input from './Input';
import { FormState } from '../Assets/types';
import { Button, ModalWrapper, ModalTitle, Label } from './styles';

const SettingsRow = styled.div`
    width: 100%;
    height: 64px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const SettingsTitleRow = styled(SettingsRow)`
    height: 82px;

    @media (max-width: 425px) {
        margin-bottom: 150px;
    }
`;

interface ISettings {
    values: FormState
    handleClose: (settings: FormState) => void;
    theme: any;
    notifications: boolean;
    darkTheme: boolean;
    toggleNotifications: () => void;
    toggleDarkTheme: () => void;
};

type FormUpdateAction = {
    key: string, value: number | boolean;
};

const initialState: FormState = {
    focusLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
};

const reducer = (formState: FormState, action: FormUpdateAction) => {
    return {
        ...formState,
        [action.key]: action.value,
    }
}

const Settings:FC<ISettings> = ({
    values,
    handleClose,
    theme,
    notifications,
    darkTheme,
    toggleNotifications,
    toggleDarkTheme,
}) => {
    const [formState, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
          key: 'focusLength',
          value: values.focusLength,
        });
        dispatch({
          key: 'shortBreakLength',
          value: values.shortBreakLength,
        });
        dispatch({
          key: 'longBreakLength',
          value: values.longBreakLength,
        });
    }, []);

    const handleInput = (inputName: string, value: number | boolean) => {
        dispatch({
            key: inputName,
            value: value,
        });
    }

    const saveAndClose = () => handleClose(formState);

    return (
        <ModalWrapper>
            <SettingsTitleRow>
                <ModalTitle>
                    Settings
                </ModalTitle>
                <Button onClick={saveAndClose}>
                    <CustomIcon size={11} icon={Close}/>
                </Button>
            </SettingsTitleRow>
            <SettingsRow>
                <Label>
                    Dark mode
                </Label>
                <IosSwitchMaterialUi 
                    colorKnobOnLeft={theme.colours.backgound}
                    colorKnobOnRight={theme.colours.mainBtn}
                    colorSwitch={theme.colours.buttons}
                    knobOnLeft={!darkTheme}
                    onChange={toggleDarkTheme}
                    aspectRatio={1.7}
                    knobSize={16}
                />
            </SettingsRow>
            <SettingsRow>
                <Label>
                    Focus length   
                </Label>
                <Input
                    name={'focusLength'}
                    value={formState.focusLength}
                    onChange={handleInput}
                />
            </SettingsRow>
            <SettingsRow>
                <Label>
                    Short break length
                </Label>
                <Input
                    name={'shortBreakLength'}
                    value={formState.shortBreakLength}
                    onChange={handleInput}
                />
            </SettingsRow>
            <SettingsRow>
                <Label>
                    Long break length
                </Label>
                <Input
                    name={'longBreakLength'}
                    value={formState.longBreakLength}
                    onChange={handleInput}
                />
            </SettingsRow>
            <SettingsRow>
                <Label>
                    Notifications
                </Label>
                <IosSwitchMaterialUi 
                    colorKnobOnLeft={theme.colours.backgound}
                    colorKnobOnRight={theme.colours.mainBtn}
                    colorSwitch={theme.colours.buttons}
                    knobOnLeft={!notifications}
                    onChange={toggleNotifications}
                    aspectRatio={1.7}
                    knobSize={16}
                />
            </SettingsRow>
        </ModalWrapper>
    );
};

export default Settings;
