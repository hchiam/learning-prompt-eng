import React from "react";
import Tippy from "@tippyjs/react";
import { animateFill, roundArrow } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import styled from "styled-components";

export default function Tooltip({
  children,
  content,
  placement = "auto",
  useAnimateFill = true,
}) {
  return (
    <StyledTippy
      content={content}
      placement={placement}
      animateFill={useAnimateFill}
      plugins={[animateFill]}
      arrow={roundArrow}
      interactiveDebounce={75}
    >
      {children}
    </StyledTippy>
  );
}

const StyledTippy = styled(Tippy)`
  opacity: 0.97;

  &[data-placement="top"]:before,
  &[data-placement="bottom"]:before,
  &[data-placement="left"]:before,
  &[data-placement="right"]:before {
    content: "";
    width: 10px;
    height: 10px;
    position: fixed;
    background: #333;
    opacity: 0.97;
  }

  &[data-placement="top"]:before {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(0 0, 50% 100%, 100% 0, 0 0);
  }

  &[data-placement="bottom"]:before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(0 100%, 50% 0, 100% 100%, 0 100%);
  }

  &[data-placement="left"]:before {
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    clip-path: polygon(0 0, 100% 50%, 0 100%, 0 0);
  }

  &[data-placement="right"]:before {
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    clip-path: polygon(100% 0, 0 50%, 100% 100%, 100% 0);
  }
`;
