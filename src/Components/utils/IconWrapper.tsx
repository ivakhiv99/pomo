import styled from "styled-components";


interface ICustomIcon {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>
}

const CustomIcon = ({icon}: any) => {
    const NewIcon = styled(icon)`
        & path {
            fill: ${props => props.theme.colours.textAndIcons};
        }`;
    return <>
        <NewIcon/>
    </>
};

export default CustomIcon;
