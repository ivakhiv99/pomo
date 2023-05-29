import { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as Play } from '../Assets/icons/Play.svg';
import CustomIcon from './utils/IconWrapper';
import StageDisplay from './StageDisplay';
import { Button, ModalWrapper, ModalTitle, Label } from './styles';


const NotificationWrapper = styled(ModalWrapper)`
    width: 448px;
    height: 318px;
    justify-content: space-between;
    padding: 24px;

    @media (max-width: 425px) {
        width: 100%;
        border: none;
        box-shadow: 0px 1px 6px ${props => props.theme.colours.buttons} , 0px 5.5px 16px ${props => props.theme.colours.backgound};
        border-radius: 0;
    }
`;

const ContinueButton = styled(Button)`
    width: 80px;
    height: 80px;
    padding: 24px;
    background: ${props => props.theme.colours.mainBtn};
    border-radius: 32px;
    margin: 0 16px;
`;

const ButtonIconWrapper = styled.div`
    width: 32px;
    height: 32px;
    padding: 3px 2px 3px 8px;
`;

interface INotification {
    isTimeout: boolean;
    handleClose: () => void;
    nextStage: string;
    nextStageIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
}

const Notification:FC<INotification> = ({isTimeout, handleClose, nextStage, nextStageIcon}) => (
   <NotificationWrapper>
            <ModalTitle>
                Stage ended
            </ModalTitle>
            <Label>{ isTimeout ? 'Continuing' : 'Skipping'} to next stage:</Label>
            <StageDisplay Icon={nextStageIcon} stage={nextStage}/>
        <ContinueButton onClick={handleClose}>
            <ButtonIconWrapper>
                <CustomIcon icon={Play}/>
            </ButtonIconWrapper>
        </ContinueButton>
   </NotificationWrapper>
);

export default Notification;
