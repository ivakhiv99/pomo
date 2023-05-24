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

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    outline: none;
`;

const SmallControllButton = styled(Button)`
    width: 80px;
    height: 80px;
    padding: 24px;
    background: ${props => props.theme.colours.buttons};
    border-radius: 24px;
`;

const BigControllButton = styled(Button)`
    width: 128px;
    height: 96px;
    padding: 32px 48px;
    background: ${props => props.theme.colours.mainBtn};
    border-radius: 32px;
    margin: 0 16px;
`;

interface IControllButtons {
    handleSkipStage: () => void;
    handlePlayBtn: () => void;
    isPlaying: boolean;
}

const ControllButtons:FC<IControllButtons> = ({
    handleSkipStage,
    handlePlayBtn,
    isPlaying
}) => (
    <ButtonsWrapper>
        <SmallControllButton>
            <CustomIcon icon={Options}/>
        </SmallControllButton>
        <BigControllButton onClick={handlePlayBtn}>
            { 
                isPlaying 
                ? <CustomIcon icon={Pause}/>
                : <CustomIcon icon={Play}/>
            }
        </BigControllButton>
        <SmallControllButton onClick={handleSkipStage}>
            <CustomIcon icon={Skip}/>
        </SmallControllButton>
    </ButtonsWrapper>
)

export default ControllButtons;
