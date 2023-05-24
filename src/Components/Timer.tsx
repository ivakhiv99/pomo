import {FC, useEffect, useState} from "react";
import styled from "styled-components";

const Time = styled.div`
    width: 295px;
    height: 436px;
    font-size: 256px;
    line-height: 85%;
    color: ${props => props.theme.colours.textAndIcons};
    font-family: 'Roboto Flex';
`;

interface ITimer {
    time: number;
    isActive: boolean;
    handleTimeout: () => void;
}

const Timer:FC<ITimer> = ({time, isActive, handleTimeout}) => {
    const [minutesLeft, updateMinutesLeft] = useState<string>('');
    const [secondsLeft, updateSecondsLeft] = useState<string>('');
    const [totalSeconds, updateTotalSeconds] = useState<number>(time*60);

    useEffect(() => {
        updateTotalSeconds(time*60);
        updateMinutesLeft(formatTime(time));
        updateSecondsLeft('00');
    }, [time]);

    useEffect(() => {
        let timerInterval:number;
        let seconds = totalSeconds;
        if(isActive) {
            timerInterval = window.setInterval(() => {
                seconds = seconds - 1;
                handleTimeFormating(seconds);
                if(seconds === 0 ) {
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

    const handleTimeFormating = (seconds: number) => {
        const m = Math.floor(seconds/60);
        const s = seconds - m*60;
        updateTotalSeconds(seconds);
        updateMinutesLeft(formatTime(m)); //TODO: add memo;
        updateSecondsLeft(formatTime(s));
    }

    const formatTime = (t:number) => t.toString().length == 1 ? `0${t}` : t.toString();

    return (
        <Time>
            <div>{minutesLeft}</div>
            <div>{secondsLeft}</div>
        </Time>
    );
}

export default Timer;
