import {FC} from "react";
import styled from "styled-components";

const Time = styled.div`
    width: 295px;
    height: 436px;
    font-size: 256px;
    line-height: 85%;
    color: #471515;
    font-family: 'Roboto Flex';
`;

interface ITimer {
    time: number;
}


//TODO: format time here?
const Timer:FC<ITimer> = ({time}) => (
    <Time>
        <div>{time}</div>
        <div>{time}</div>
    </Time>
)

export default Timer;
