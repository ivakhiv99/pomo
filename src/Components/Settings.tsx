import {FC, useEffect, useReducer} from 'react';
import styled from "styled-components";
import CustomIcon from './utils/IconWrapper';
import { ReactComponent as Close } from '../Assets/icons/Close.svg';
import IosSwitchMaterialUi from 'ios-switch-material-ui';
import Input from './Input';
import {FormState} from '../Assets/types';

//TODO: reuse this;
const ModalWrapper = styled.div`
    width: 448px;
    height: 418px;

    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.colours.backgound};
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0px 0px 16px;
    box-shadow: 0px 1px 6px ${props => props.theme.colours.buttons} , 0px 5.5px 16px ${props => props.theme.colours.backgound};
    border-radius: 24px;
    z-index: 99;
`;

//TODO: reuse this;
const FlexRowSpaceBetween = styled.div`
    width: 100%;
    height: 64px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

//TODO: reuse this;
const ModalTitle = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
`;

//TODO: reuse this;
const Label = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
`;

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
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
            <FlexRowSpaceBetween>
                <ModalTitle>
                    Settings
                </ModalTitle>
                <Button onClick={saveAndClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Dark mode
                </Label>
                <IosSwitchMaterialUi 
                    colorKnobOnLeft={theme.colours.backgound}
                    colorKnobOnRight={theme.colours.mainBtn}
                    colorSwitch={theme.colours.buttons}
                    knobOnLeft={!darkTheme}
                    onChange={toggleDarkTheme}
                />
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Focus length   
                </Label>
                <Input
                    name={'focusLength'}
                    value={formState.focusLength}
                    onChange={handleInput}
                />
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Short break length
                </Label>
                <Input
                    name={'shortBreakLength'}
                    value={formState.shortBreakLength}
                    onChange={handleInput}
                />
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Long break length
                </Label>
                <Input
                    name={'longBreakLength'}
                    value={formState.longBreakLength}
                    onChange={handleInput}
                />
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Notifications
                </Label>
                <IosSwitchMaterialUi 
                    colorKnobOnLeft={theme.colours.backgound}
                    colorKnobOnRight={theme.colours.mainBtn}
                    colorSwitch={theme.colours.buttons}
                    knobOnLeft={!notifications}
                    onChange={toggleNotifications}
                />
            </FlexRowSpaceBetween>
        </ModalWrapper>
    );
};

export default Settings;
