import React, { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { View, Button, Text } from "@tarojs/components";

import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.scss";
import { useTypedSelector } from "../../reducers";
import Modal from "../../components/modal";
import PageUpload from "../upload";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

export default function Index() {
  const [lstate, setLState] = useState(0);
  const dispatch = useDispatch();
  const data = useTypedSelector((e) => e.counter.num);
  console.log(data);

  return (
    <View>
      <PageUpload />
      {/* Hello Argus local:{lstate} global:{data}
      <Button onClick={(e) => setLState((e) => e + 1)}> add </Button>
      <Button onClick={(e) => setLState((e) => e - 1)}> minus </Button>
      <Button onClick={(e) => dispatch(add())}> global add </Button>
      <Button onClick={(e) => dispatch(minus())}> global minus </Button> */}
    </View>
  );
}
