import { Button } from "@tarojs/components";
import React, { ReactChild } from "react";
import "./index.scss";

interface IProps {
  title?: string;
  content: JSX.Element;
  button: Array<JSX.Element>;
}

export default function Modal(props: IProps) {
  const { title, content, button } = props;
  return (
    <view className={"modal"}>
      <view className={"mask"} />
      <view className={"content"}>
        {title ? <view className={"title"}>{title}</view> : null}
        <view className={"body"}>{content}</view>
        <view className={"control"}>{button}</view>
      </view>
    </view>
  );
}
