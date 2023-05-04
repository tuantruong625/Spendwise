import { HTMLAttributes } from "react"
import styled from "styled-components"

interface GridProps extends HTMLAttributes<HTMLDivElement> {
 cols?: number
 rows?: number
 gap?: string
 children: JSX.Element | JSX.Element[]
}

interface StyleProps {
 cols?: number
 rows?: number
 gap?: string
}

const GridStyles = styled.div<StyleProps>`
 display: grid;
 grid-template-columns: repeat(${({ cols }) => cols}, minmax(0, 1fr));
 grid-template-rows: repeat(${({ rows }) => rows}, minmax(0, 1fr));
 grid-gap: ${({ gap }) => `${gap}`};
`

const Grid = ({ cols, rows, gap, children }: GridProps): JSX.Element => {
 return (
  <GridStyles {...{ rows, cols, gap }}>
   {children}
  </GridStyles>
 )
}

export default Grid