import React from "react";
import {
  RefineTooltipContentStep2,
  RefineTooltipContentStep3,
} from "./tooltipTexts";
import Tippy from "@tippyjs/react";
import getViewWidth from "../helpers/getViewWidth";

export default function RefinementDoubleTooltip({ children }) {
  const spaceNeededForTwoTooltipsOnRefine = 1250;
  if (getViewWidth() < spaceNeededForTwoTooltipsOnRefine) {
    return <>{children}</>;
  } else {
    return (
      <Tippy content={<RefineTooltipContentStep2 />} placement="left">
        <Tippy content={<RefineTooltipContentStep3 />} placement="right">
          {children}
        </Tippy>
      </Tippy>
    );
  }
}
