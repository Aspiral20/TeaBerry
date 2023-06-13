import React, { FC } from "react";

interface ConditionalWrapperProps {
  condition: boolean
  wrapIsCond: (children: React.ReactNode) => void
  wrapNoCond: (children: React.ReactNode) => void
  children: React.ReactNode
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({ condition, wrapIsCond, wrapNoCond, children }) => (
  <>
    {condition ? wrapIsCond(children) : wrapNoCond(children)}
  </>
)
