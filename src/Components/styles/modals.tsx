import styled from "styled-components";

export const ModalWrapper = styled.div`
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
    box-shadow: 0px 1px 6px ${props => props.theme.colours.buttons} , 0px 5.5px 16px ${props => props.theme.colours.backgound};
    border-radius: 24px;
    z-index: 99;

    @media (max-width: 425px) {
        width: 100%;
        height: 100%;
        border: none;
        box-shadow: none;
        border-radius: 0;
        justify-content: flex-start;
    }

`;

export const ModalTitle = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
`;

export const Label = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.15px;
    color: ${props => props.theme.colours.textAndIcons};
`;