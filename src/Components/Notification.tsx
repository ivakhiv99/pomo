import {FC} from 'react';
import styled from 'styled-components';
import { ReactComponent as Play } from '../Assets/icons/Play.svg';
import {ReactComponent as FocusIcon} from './Assets/icons/Focus.svg';
import {ReactComponent as BreakIcon} from './Assets/icons/Break.svg';
import CustomIcon from './utils/IconWrapper';
import StageDisplay from './StageDisplay';
import {Stages} from '../Assets/types';

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
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.039), 0px 5.5px 16px rgba(0, 0, 0, 0.19);
    border-radius: 24px;
    z-index: 99;
`;

const NotificationWrapper = styled(ModalWrapper)`
    width: 448px;
    height: 318px;
    justify-content: space-between;
    padding: 24px;
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
const BigControllButton = styled(Button)`
    /* width: 128px;
    height: 96px; */
    width: 80px;
    height: 80px;
    /* padding: 32px 48px; */
    padding: 24px;
    background: ${props => props.theme.colours.mainBtn};
    border-radius: 32px;
    margin: 0 16px;
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

const FlexRowSpaceBetween = styled.div`
    width: 100%;
    height: 64px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

interface INotification {
    isTimeout: boolean;
    handleClose: () => void;
    nextStage: string;
    nextStageIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
}

const Notification:FC<INotification> = ({isTimeout, handleClose, nextStage, nextStageIcon}) => {
    console.log('Notification:  ', {isTimeout})
    return (
       <NotificationWrapper>
                <ModalTitle>
                    Stage ended
                </ModalTitle>
                <Label>{ isTimeout ? 'Continuing' : 'Skipping'} to next stage:</Label>
                <StageDisplay Icon={nextStageIcon} stage={nextStage}/>
            <BigControllButton onClick={handleClose}>
                <CustomIcon icon={Play}/>
            </BigControllButton>
       </NotificationWrapper>
    )
};


export default Notification;
