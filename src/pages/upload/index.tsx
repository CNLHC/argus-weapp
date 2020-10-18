import React from "react";
import Modal from "../../components/modal";
import bg from "../../../assets/welcome_bg.svg";
import IconBean from "../../../assets/bean_icon.svg";
import "./index.scss";
import ArgusButton from "../../components/button";

export default function PageUpload() {
  console.log(1, bg);
  const ModalContent = () => (
    <view className={"welcom-modal"}>
      <view className={"image-area"}>
        <image src={bg} />
        <image
          src={IconBean}
          style={{
            position: "relative",
            bottom: "200rpx",
          }}
        />
      </view>
      <view className={"text-area"}>
        为帮助你更好地生成视频笔记，我们提供您Argus咖啡豆来兑换视频识别时长，1个咖啡豆可兑换1分钟。
      </view>
      <view className={"add-coins"}>
        <image src={IconBean} />
        <view> +150</view>
      </view>
    </view>
  );

  return (
    <view>
      <Modal
        title={"欢迎来到十行笔记"}
        content={<ModalContent />}
        button={[<ArgusButton text={"开始使用"} style={{ width: "240rpx" }} />]}
      />
    </view>
  );
}
