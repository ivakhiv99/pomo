import { FC } from "react";
import styled from "styled-components";

interface ICustomIcon {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>
    size?: number;
}

const CustomIcon:FC<ICustomIcon> = ({icon, size}) => {
    const NewIcon = styled(icon)`
        ${size ? 
            `
            width: ${size}px;
            height: ${size}px;
            `
            :''
        }
        & path {
            fill: ${props => props.theme.colours.textAndIcons};

        }`;
    return <NewIcon/>
};

export default CustomIcon;
