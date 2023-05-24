import {FC} from 'react';
import styled from "styled-components";
import CustomIcon from './utils/IconWrapper';
import { ReactComponent as Close } from '../Assets/icons/Close.svg';


const SettingsWrapper = styled.div`
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
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.039), 0px 5.5px 16px rgba(0, 0, 0, 0.19);
    border-radius: 24px;
    z-index: 99;
`;

const FlexRowSpaceBetween = styled.div`
    width: 100%;
    height: 64px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ModalTitle = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
`;

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
    handleClose: () => void;
}

const Settings:FC<ISettings> = ({handleClose}) => {
    return (
        <SettingsWrapper>
            <FlexRowSpaceBetween>
                <ModalTitle>
                    Settings
                </ModalTitle>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Dark mode
                </Label>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Focus length   
                </Label>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Short break length
                </Label>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Long break length
                </Label>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
                <Label>
                    Notifications
                </Label>
                <Button onClick={handleClose}>
                    <CustomIcon icon={Close}/>
                </Button>
            </FlexRowSpaceBetween>
        </SettingsWrapper>
    );
};

export default Settings;
