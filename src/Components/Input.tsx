import { FC } from 'react';
import styled from "styled-components";
import { ReactComponent as Play } from '../Assets/icons/Play.svg';
import CustomIcon from './utils/IconWrapper';
import { Button } from './styles';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledInput = styled.input`
    background: transparent; 
    border: none;
    outline: none;
    width: 66px;
    height: 40px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
    border: 1px solid ${props => props.theme.colours.inputBorders};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    display: flex;
    align-items: center;
    text-align: center;
`;

const InputControls = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputBtn = styled(Button)`
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    &&&:active {
        background-color: ${props => props.theme.colours.buttons};
    }
`;

const InputBtnTop = styled(InputBtn)`
    border-top: 1px solid ${props => props.theme.colours.inputBorders};
    border-right: 1px solid ${props => props.theme.colours.inputBorders};
    border-bottom: 1px solid ${props => props.theme.colours.inputBorders};
    border-top-right-radius: 8px;
`;

const InputBtnBottom = styled(InputBtn)`
    border-right: 1px solid ${props => props.theme.colours.inputBorders};
    border-bottom: 1px solid ${props => props.theme.colours.inputBorders};
    border-bottom-right-radius: 8px;
`;

const IconUp = styled(Play)`
    width: 12px;
    height: 10px;
    transform: rotate(-90deg);
`;

const IconDown = styled(Play)`
    width: 12px;
    height: 10px;
    transform: rotate(90deg);
`;

interface IInput {
    name: string;
    value: number;
    onChange: (inputName: string, value: number | boolean) => void;
}

const Input:FC<IInput> = ({
    name,
    value,
    onChange, 
}) => {

    const increment = () => {
        if (value+1 > 0 && value+1 <= 99) {
            onChange(name, value+1);
        }
    };

    const decrement = () => {
        if (value-1 > 0) {
            onChange(name, value-1);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!isNaN(+e.target.value) && +e.target.value<=99) {
            if(+e.target.value === 0) {
                onChange(name, 1);
            } else {
                onChange(name, +e.target.value);
            }
        }
    }

    return (
        <InputWrapper>
            <StyledInput
                value={value}
                onChange={handleInput}
            />
            <InputControls>
                <InputBtnTop onClick={increment}>
                    <CustomIcon icon={IconUp}/>
                </InputBtnTop>
                <InputBtnBottom onClick={decrement}>
                    <CustomIcon icon={IconDown}/>
                </InputBtnBottom>
            </InputControls>
        </InputWrapper>
    )
};

export default Input;
