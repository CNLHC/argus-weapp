import { Button } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import React, { ComponentType } from "react";
import "./index.scss";

interface IProps {
  text: string;
  style: React.CSSProperties;
}

export default function ArgusButton(props: Partial<ButtonProps> & IProps) {
  return (
    <Button {...props} className={"argus-button"}>
      {props.text}
    </Button>
  );
}
