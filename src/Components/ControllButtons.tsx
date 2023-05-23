import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as Options } from '../Icons/Options.svg';
import { ReactComponent as Pause } from '../Icons/Pause.svg';
import { ReactComponent as Play } from '../Icons/Play.svg';
import { ReactComponent as Skip } from '../Icons/Skip.svg';

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
`;

const SmallControllButton = styled(Button)`
    width: 80px;
    height: 80px;
    padding: 24px;
    background: rgba(255, 76, 76, 0.15);
    border-radius: 24px;
`;

const BigControllButton = styled(Button)`
    width: 128px;
    height: 96px;
    padding: 32px 48px;
    background: rgba(255, 76, 76, 0.71);
    border-radius: 32px;
    margin: 0 16px;
`;

interface IControllButtons {
    handleSkipStage: () => void;
}

const ControllButtons:FC<IControllButtons> = ({handleSkipStage}) => (
    <ButtonsWrapper>
        <SmallControllButton>
            <Options/>
        </SmallControllButton>
        <BigControllButton>
            <Play/>
        </BigControllButton>
        <SmallControllButton onClick={handleSkipStage}>
            <Skip/>
        </SmallControllButton>
    </ButtonsWrapper>
)

export default ControllButtons;
