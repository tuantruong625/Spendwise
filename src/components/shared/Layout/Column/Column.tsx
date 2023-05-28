import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
	start: number;
	end?: number;
	children?: JSX.Element | JSX.Element[];
}

interface StyleProps {
	start: number;
	end: number;
}

const ColumnStyles = styled.div<StyleProps>`
	grid-column: ${({ start }) => start} / span ${({ end }) => end};
`;

const Column = ({
	start,
	end = -1,
	children,
	...props
}: ColumnProps): JSX.Element => {
	return <ColumnStyles {...{ start, end, ...props }}>{children}</ColumnStyles>;
};

export default Column;
