import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as Options } from '../Assets/icons/Options.svg';
import { ReactComponent as Pause } from '../Assets/icons/Pause.svg';
import { ReactComponent as Play } from '../Assets/icons/Play.svg';
import { ReactComponent as Skip } from '../Assets/icons/Skip.svg';
import CustomIcon from './utils/IconWrapper';

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

//TODO: reuse this
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

const SmallControllButton = styled(Button)`
    width: 80px;
    height: 80px;
    padding: 24px;
    background: ${props => props.theme.colours.buttons};
    border-radius: 24px;
`;

//TODO: reuse this
const BigControllButton = styled(Button)`
    width: 128px;
    height: 96px;
    padding: 32px 48px;
    background: ${props => props.theme.colours.mainBtn};
    border-radius: 32px;
    margin: 0 16px;
`;

interface StyleProps {
    isPlaying: boolean;
}

const ButtonIconWrapper = styled.div<StyleProps>`
    width: 32px;
    height: 32px;
    padding: ${props => props.isPlaying ? '4px 5px' : '3px 2px 3px 8px'};
`;

interface IControllButtons {
    handleSkipStage: () => void;
    handlePlayBtn: () => void;
    openSettings: () => void;
    isPlaying: boolean;
    areDisabled: boolean;
}

const ControllButtons:FC<IControllButtons> = ({
    handleSkipStage,
    handlePlayBtn,
    openSettings,
    isPlaying,
    areDisabled,
}) => (
    <ButtonsWrapper>
        <SmallControllButton
            onClick={openSettings}
            disabled={areDisabled}    
        >
            <CustomIcon icon={Options}/>
        </SmallControllButton>
        <BigControllButton
            onClick={handlePlayBtn}
            disabled={areDisabled}
        >
            <ButtonIconWrapper isPlaying={isPlaying}>
            { 
                isPlaying 
                ? <CustomIcon icon={Pause}/>
                : <CustomIcon icon={Play}/>
            }
            </ButtonIconWrapper>
        </BigControllButton>
        <SmallControllButton
            onClick={handleSkipStage}
            disabled={areDisabled}    
        >
            <CustomIcon icon={Skip}/>
        </SmallControllButton>
    </ButtonsWrapper>
)

export default ControllButtons;
