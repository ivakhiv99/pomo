import {FC, useEffect, useState} from "react";
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
    isActive: boolean;
    handleTimeout: () => void;
}


//TODO: format time here?
const Timer:FC<ITimer> = ({time, isActive, handleTimeout}) => {
    const [timeLeft, updateTimeLeft] = useState(time);
    
    useEffect(() => {
        let timerInterval:number;
        if(isActive) {
            let t = timeLeft;
            timerInterval = window.setInterval(() => {
                if(t > 0) {
                    t = t -1;
                    updateTimeLeft(t);
                } else {
                    clearInterval(timerInterval);
                    handleTimeout();
                }
            }, 1000);
        }

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }
    }, [isActive]);

    useEffect(() => {
        updateTimeLeft(time)
    }, [time]);

    return (
        <Time>
            <div>{timeLeft}</div>
            <div>{timeLeft}</div>
        </Time>
    );
    }

export default Timer;
