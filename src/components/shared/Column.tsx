import styled from "styled-components"

interface ColumnProps {
  start: number
  end?: number
  children: JSX.Element
}

interface StyleProps {
  start: number
  end: number
}

const ColumnStyles = styled.div<StyleProps>`
  grid-column: ${({ start }) => start} / span ${({ end }) => end};
`

const Column = ({ start, end = -1, children }: ColumnProps) => (
  <ColumnStyles {...{start, end}}>
    {children}
  </ColumnStyles>
)

export default Column