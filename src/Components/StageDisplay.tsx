import { FC } from "react";
import styled from "styled-components";
import CustomIcon from './utils/IconWrapper';

const Stage = styled.div`
    width: auto;
    max-width: 195px;
    height: 48px;
    border: 2px solid ${props => props.theme.colours.textAndIcons};
    border-radius: 9999px;
    background: ${props => props.theme.colours.buttons};
    color: ${props => props.theme.colours.textAndIcons};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;

    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;

`;

interface IStageDisplay {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    stage: string;
}

const StageDisplay:FC<IStageDisplay> = ({ Icon, stage }) => (
    <Stage>
        <CustomIcon icon={Icon}/>
        {stage}
    </Stage>
)

export default StageDisplay;
