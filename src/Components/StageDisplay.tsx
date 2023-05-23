import { FC } from "react";
import styled from "styled-components";

const Stage = styled.div`
    /* min-width: 136px; */
    width: auto;
    max-width: 195px;
    height: 48px;
    border: 2px solid #471515;
    border-radius: 9999px;
    background: rgba(255, 76, 76, 0.15);

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
        <Icon/>
        {stage}
    </Stage>
)

export default StageDisplay;
