import { Button as MantineButton } from "@mantine/core";
import React, { forwardRef } from "react";

export const Button = forwardRef<
  HTMLDivElement,
  { onClick: () => void; style?: React.CSSProperties; disabled?: boolean; children: JSX.Element | string }
>(({ onClick, style, disabled, children }, ref) => (
  <MantineButton
    disabled={disabled}
    onClick={onClick}
    color="violet"
    style={{
      marginTop: 10,
      marginLeft: "auto",
      justifySelf: "center",
      fontWeight: 400,
      ...style,
    }}
    ref={ref as any}
  >
    {children}
  </MantineButton>
));
