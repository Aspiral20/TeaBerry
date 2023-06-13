import React from "react";

const paramsSvg = ({
  stroke = "none",
  strokeWidth = "0",
  strokeDasharray = "none",
  strokeLinecap = "butt",
  strokeLinejoin = "miter",
  strokeMiterlimit = "10",
  fill = "none",
  fillRule = "nonzero",
}) => ({
  stroke: stroke,
  strokeWidth: strokeWidth,
  strokeDasharray: strokeDasharray,
  strokeLinecap: strokeLinecap,
  strokeLinejoin: strokeLinejoin,
  strokeMiterlimit: strokeMiterlimit,
  fill: fill,
  fillRule: fillRule,
}) as React.SVGProps<any>

export default paramsSvg;