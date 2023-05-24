import { FC } from "react";
import styled from "styled-components";

interface ICustomIcon {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>
}
//TODO: use interface
const CustomIcon:FC<ICustomIcon> = ({icon}) => {
    const NewIcon = styled(icon)`
        & path {
            fill: ${props => props.theme.colours.textAndIcons};
        }`;
    return <NewIcon/>
};

export default CustomIcon;
