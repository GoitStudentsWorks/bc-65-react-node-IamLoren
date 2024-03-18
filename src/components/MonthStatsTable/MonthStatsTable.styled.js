import styled from "styled-components";
import {Tooltip} from 'react-tooltip';
import '../../css/variables.css';

export const StyledTooltip = styled(Tooltip)`
 &#my-tooltip {
    width: 292px;
    height: 188px;
    background-color: var(--tooltip-bg-color);
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    color: var(--primary-text);
    position: absolute;
    z-index: 100;
    padding: 24px 16px;
  }

  `
export const StyledDivWrapper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

  export const AccentSpan = styled.span`
    color: var(--secondary-text);
  `