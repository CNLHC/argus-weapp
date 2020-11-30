
// 以单个汉字或单词为单位对字符串进行切割
function cutString(cutLength: any, str: any) {
  const cut = Number(cutLength);
  // const strEmptyHtml = str.replace(/<[^>]+>/g, ''); // 截取html标签
  const regAZ: any = /[a-zA-Z]+/gi;
  const str2 = str.match(regAZ); // 英文的正则匹配
  const reg = /[\u4e00-\u9fa5]/g; // 中文的正则匹配
  const newArr: any[] = []; // 存放中文的数组
  const newArr2: any[] = []; // 存放英文的数组
  const names = str.match(reg);
  const keyArr = []; // 用于存放字符的索引位置
  const arr: any = {}; // 以索引位置为键，将中文和英文作为值存入，方便其排序，其长度为即为句子的真实字数，
  // 所以切割的字数为n时其，取第n个值的键即为真实的切割点

  if (str2 !== null && str2 !== 'null') {
    for (let i = 0; i < str2.length; i++) {
      const items: any = str2[i];
      // 判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
      // if (jq.inArray(items, newArr) === -1) {
      if (newArr.includes(items)) {
        newArr.push(items);
      }
    }

    for (const key in newArr) {
      let index = str.indexOf(newArr[key]); // 字符出现的位置
      arr[index] = newArr[key];
      while (index !== -1) {
        index = str.indexOf(newArr[key], index + 1); // 从字符串出现的位置的下一位置开始继续查找
        if (index !== -1) {
          arr[index] = newArr[key];
        }
      }
    }
  }

  if (names !== null && names !== 'null') {
    for (let i = 0; i < names.length; i++) {
      const items = names[i];
      // 判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
      // if (jq.inArray(items, newArr2) === -1) {
      if (newArr2.includes(items)) {
        newArr2.push(items);
      }
    }
    for (const key in newArr2) {
      let index = str.indexOf(newArr2[key]); // 字符出现的位置

      arr[index] = newArr2[key];
      while (index !== -1) {
        index = str.indexOf(newArr2[key], index + 1); // 从字符串出现的位置的下一位置开始继续查找
        if (index !== -1) {
          arr[index] = newArr2[key];
        }
      }
    }
  }

  for (const key in arr) {
    keyArr.push(key);
  }
  const son1 = str.substring(0, keyArr[cut]);
  const son2 = str.substring(keyArr[cut] || str.length, str.length + 1);
  const data = {
    son1: son1,
    son2: son2,
    totalLength: keyArr.length,
  };
  return data;
}

// 将文本按ppt时间范围，依据soundWord中onebest字符串长度，分割到各个ppt中
export function textEditor(resData: any) {
  const timeArr: any = [];
  const textArr: any = [];
  const pptCutArr: any = []; // 用来记录每个ppt存放的句子，从第几个句子到第几个句子

  if (resData.ppt.length === 1) {
    // 剪辑情况一，长度为1，有文字或无文字
    let text = ''; // 用来存放当前要放入textArr中的文本
    if (resData.soundWord.length !== 0) {
      // 因为只有一张ppt，所以全部都拼在一起放入同一个编辑器中
      for (let i = 0; i < resData.soundWord.length; i++) {
        text = text + resData.soundWord[i].onebest;
      }
      pptCutArr[0] = { start: 0, end: resData.soundWord.length - 1 };
    } else if (resData.soundWord.length === 0) {
      text = '此处无识别文字，可输入笔记';
    }
    textArr.push(text);
    timeArr.push(resData.ppt[0].timestamp * 1000);
  } else if (resData.ppt.length > 1) {
    // 剪辑情况二，长度为n，有文字或无文字
    if (resData.soundWord.length === 0) {
      // 剪辑情况2.1，无文字
      const text = '此处无识别文字，可输入笔记';
      for (let i = 0; i < resData.ppt.length; i++) {
        textArr.push(text);
        timeArr.push(resData.ppt[i].timestamp * 1000);
      }
    } else if (resData.soundWord.length > 0) {
      // 剪辑情况2.1，有文字

      /* ppt的时间范围为当前ppt的开始时间到下一张ppt的开始时间
       * ppt[i].timestamp ————ppt[i+1].timestamp ）
       * 2.1.1 当句子完全在ppt的时间范围内时，直接存入,currentSoundWord加一
       * ppt[i].timestamp  < soundWord[j].bg
       * &&ppt[i+1].timestamp  >soundWord[j].ed
       * 2.2.2 当句子尾部超出当前ppt的范围内
       * 将当前句子切割成两部分，前部分留在当前ppt，后部分的时间和文字取代当前句子
       * currentPpt加一，currentSoundWord保持不变
       * 2.2.3 当句子头部超出当前ppt的范围内
       * 因为ppt的第一张必定是0（由后端硬性添加),经过2.2.2后，不存在2.2.3！！！
       * 2.2.4 当句子的头部和尾部都超出当前ppt的范围内
       * 参考2.2.3，当前情况也不存在！！！
       * 2.2.5 当句子完全不在当前ppt范围内时
       * currentPpt加一，currentSoundWord保持不变
       * */

      let currentPpt = 0;
      let currentSoundWord = 0;
      const ppt: any = [];
      const soundWord: any = [];

      // 将数据拷贝，避免影响原数据

      for (let i = 0; i < resData.soundWord.length; i++) {
        soundWord.push({
          ed: resData.soundWord[i].ed,
          bg: resData.soundWord[i].bg,
          onebest: resData.soundWord[i].onebest,
        });
      }

      for (let i = 0; i < resData.ppt.length; i++) {
        ppt.push({
          timestamp: resData.ppt[i].timestamp,
        });
      }

      // 先将soundWord的时间转换成number类型
      for (let i = 0; i < soundWord.length; i++) {
        soundWord[i].ed = parseInt(soundWord[i].ed);
        soundWord[i].bg = parseInt(soundWord[i].bg);
      }

      // 将ppt的时间转成和句子一样的毫秒形式
      for (let i = 0; i < ppt.length; i++) {
        ppt[i].timestamp = ppt[i].timestamp * 1000;
        timeArr[i] = ppt[i].timestamp;
        textArr[i] = '';
      }

      // 为每一张ppt添加结束时间
      for (let i = 0; i < ppt.length; i++) {
        if (i < ppt.length - 1) {
          ppt[i].endTime = ppt[i + 1].timestamp;
        } else {
          ppt[i].endTime = 2592000000; // 最后一张ppt的结束时间设置为一个月
        }
      }

      // 当currentSoundWord === soundWord.length时跳出循环
      while (!(currentSoundWord === soundWord.length)) {
        if (ppt[currentPpt].endTime <= soundWord[currentSoundWord].bg) {
          // 2.2.5

          currentPpt++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime >= soundWord[currentSoundWord].ed
        ) {
          // 2.2.1

          textArr[currentPpt] = textArr[currentPpt] + soundWord[currentSoundWord].onebest;
          currentSoundWord++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime < soundWord[currentSoundWord].ed
        ) {
          // 2.2.2
          const totalLength = cutString(0, soundWord[currentSoundWord].onebest).totalLength;
          const halfTime = ppt[currentPpt].endTime - soundWord[currentSoundWord].bg;
          const soundWordTime = soundWord[currentSoundWord].ed - soundWord[currentSoundWord].bg;
          const halfLength = Math.floor((halfTime / soundWordTime) * totalLength);
          const cutTxt = cutString(halfLength, soundWord[currentSoundWord].onebest);
          textArr[currentPpt] = textArr[currentPpt] + cutTxt.son1;
          soundWord[currentSoundWord].onebest = cutTxt.son2;
          soundWord[currentSoundWord].bg = ppt[currentPpt].endTime;

          currentPpt++;
        }
      }
    }
  }

  const NewData = {
    textArr: textArr,
    timeArr: timeArr,
    pptCutArr: pptCutArr,
  };
  return NewData;
}

// 翻译的笔记，需要给原文soundWord中onebest的每句添加p标签，方便原文和翻译按p标签形成一一对应的关系
export function textEditorAddTagP(resData: any) {
  const timeArr: any = [];
  const textArr: any = [];
  const pptCutArr: any = [];
  let flag = false;

  if (resData.ppt.length === 1) {
    let text = '';
    if (resData.soundWord.length !== 0) {
      for (let i = 0; i < resData.soundWord.length; i++) {
        text = text + '<p>' + resData.soundWord[i].onebest + '</p>';
      }

      pptCutArr[0] = { start: 0, end: resData.soundWord.length - 1 };
    } else if (resData.soundWord.length === 0) {
      text = '此处无识别文字，可输入笔记';
    }
    textArr.push(text);
    timeArr.push(resData.ppt[0].timestamp * 1000);
  } else if (resData.ppt.length > 1) {
    if (resData.soundWord.length === 0) {
      const text = '此处无识别文字，可输入笔记';
      for (let i = 0; i < resData.ppt.length; i++) {
        textArr.push(text);
        timeArr.push(resData.ppt[i].timestamp * 1000);
      }
    } else if (resData.soundWord.length > 0) {
      let currentPpt = 0;
      let currentSoundWord = 0;
      const ppt: any = [];
      const soundWord: any = [];

      for (let i = 0; i < resData.soundWord.length; i++) {
        soundWord.push({
          ed: resData.soundWord[i].ed,
          bg: resData.soundWord[i].bg,
          onebest: resData.soundWord[i].onebest,
        });
      }

      for (let i = 0; i < resData.ppt.length; i++) {
        ppt.push({
          timestamp: resData.ppt[i].timestamp,
        });
      }

      for (let i = 0; i < soundWord.length; i++) {
        soundWord[i].ed = parseInt(soundWord[i].ed);
        soundWord[i].bg = parseInt(soundWord[i].bg);
      }

      for (let i = 0; i < ppt.length; i++) {
        ppt[i].timestamp = ppt[i].timestamp * 1000;
        timeArr[i] = ppt[i].timestamp;
        textArr[i] = '';
      }

      for (let i = 0; i < ppt.length; i++) {
        if (i < ppt.length - 1) {
          ppt[i].endTime = ppt[i + 1].timestamp;
        } else {
          ppt[i].endTime = 2592000000; // 最后一张ppt的结束时间设置为一个月
        }
      }

      while (!(currentSoundWord === soundWord.length)) {
        if (ppt[currentPpt].endTime <= soundWord[currentSoundWord].bg) {
          // 2.2.5
          if (flag) {
            pptCutArr[currentPpt] = { end: currentSoundWord };
          } else {
            pptCutArr[currentPpt] = '0';
          }
          flag = false;

          currentPpt++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime >= soundWord[currentSoundWord].ed
        ) {
          // 2.2.1
          flag = true;
          textArr[currentPpt] = textArr[currentPpt] + '<p>' + soundWord[currentSoundWord].onebest + '</p>';
          currentSoundWord++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime < soundWord[currentSoundWord].ed
        ) {
          // 2.2.2
          const totalLength = cutString(0, soundWord[currentSoundWord].onebest).totalLength;
          const halfTime = ppt[currentPpt].endTime - soundWord[currentSoundWord].bg;
          const soundWordTime = soundWord[currentSoundWord].ed - soundWord[currentSoundWord].bg;
          const halfLength = Math.floor((halfTime / soundWordTime) * totalLength);
          const cutTxt = cutString(halfLength, soundWord[currentSoundWord].onebest);
          textArr[currentPpt] = textArr[currentPpt] + '<p>' + cutTxt.son1 + '</p>';
          soundWord[currentSoundWord].onebest = cutTxt.son2;
          soundWord[currentSoundWord].bg = ppt[currentPpt].endTime;

          pptCutArr[currentPpt] = { end: currentSoundWord };
          flag = false;

          currentPpt++;
        }
      }
    }
  }

  const NewData = {
    textArr: textArr,
    timeArr: timeArr,
    pptCutArr: pptCutArr,
  };
  return NewData;
}

// 翻译的笔记，对译文进行切割
function editorTranslation(resData: any) {
  const timeArr: any = [];
  const textArr: any = [];
  const pptCutArr: any = [];
  let flag = false;

  if (resData.ppt.length === 1) {
    let text = '';
    if (resData.translation.length !== 0) {
      for (let i = 0; i < resData.translation.length; i++) {
        text = text + '<p>' + resData.translation[i].onebest + '</p>';
      }

      // ppt存放了所有的文字
      pptCutArr[0] = { start: 0, end: resData.translation.length - 1 };
    } else if (resData.translation.length === 0) {
      text = '此处无识别文字，可输入笔记';
    }
    textArr.push(text);
    timeArr.push(resData.ppt[0].timestamp * 1000);
  } else if (resData.ppt.length > 1) {
    if (resData.translation.length === 0) {
      const text = '此处无识别文字，可输入笔记';
      for (let i = 0; i < resData.ppt.length; i++) {
        textArr.push(text);
        timeArr.push(resData.ppt[i].timestamp * 1000);
      }
    } else if (resData.translation.length > 0) {
      let currentPpt = 0;
      let currentSoundWord = 0;
      const ppt: any = [];
      const soundWord: any = [];

      for (let i = 0; i < resData.translation.length; i++) {
        soundWord.push({
          ed: resData.translation[i].ed,
          bg: resData.translation[i].bg,
          onebest: resData.translation[i].onebest,
        });
      }

      for (let i = 0; i < resData.ppt.length; i++) {
        ppt.push({
          timestamp: resData.ppt[i].timestamp,
        });
      }

      for (let i = 0; i < soundWord.length; i++) {
        soundWord[i].ed = parseInt(soundWord[i].ed);
        soundWord[i].bg = parseInt(soundWord[i].bg);
      }

      for (let i = 0; i < ppt.length; i++) {
        ppt[i].timestamp = ppt[i].timestamp * 1000;
        timeArr[i] = ppt[i].timestamp;
        textArr[i] = '';
      }

      for (let i = 0; i < ppt.length; i++) {
        if (i < ppt.length - 1) {
          ppt[i].endTime = ppt[i + 1].timestamp;
        } else {
          ppt[i].endTime = 2592000000; // 最后一张ppt的结束时间设置为一个月
        }
      }

      while (!(currentSoundWord === soundWord.length)) {
        if (ppt[currentPpt].endTime <= soundWord[currentSoundWord].bg) {
          if (flag) {
            pptCutArr[currentPpt] = { end: currentSoundWord };
          } else {
            pptCutArr[currentPpt] = '0';
          }
          flag = false;

          currentPpt++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime >= soundWord[currentSoundWord].ed
        ) {
          // 2.2.1
          flag = true;
          textArr[currentPpt] = textArr[currentPpt] + '<p>' + soundWord[currentSoundWord].onebest + '</p>';
          currentSoundWord++;
        } else if (
          ppt[currentPpt].timestamp <= soundWord[currentSoundWord].bg &&
          ppt[currentPpt].endTime < soundWord[currentSoundWord].ed
        ) {
          // 2.2.2
          const totalLength = cutString(0, soundWord[currentSoundWord].onebest).totalLength;
          const halfTime = ppt[currentPpt].endTime - soundWord[currentSoundWord].bg;
          const soundWordTime = soundWord[currentSoundWord].ed - soundWord[currentSoundWord].bg;
          const halfLength = Math.floor((halfTime / soundWordTime) * totalLength);
          const cutTxt = cutString(halfLength, soundWord[currentSoundWord].onebest);
          textArr[currentPpt] = textArr[currentPpt] + '<p>' + cutTxt.son1 + '</p>';
          soundWord[currentSoundWord].onebest = cutTxt.son2;
          soundWord[currentSoundWord].bg = ppt[currentPpt].endTime;

          pptCutArr[currentPpt] = { end: currentSoundWord };
          flag = false;

          currentPpt++;
        }
      }
    }
  }

  const NewData = {
    textArr: textArr,
    timeArr: timeArr,
    pptCutArr: pptCutArr,
  };
  return NewData;
}

// 将ppt中的各个word整合
function setWords(ppt: any) {
  const words = [];
  for (let i = 0; i < ppt.length; i++) {
    let text = '';
    if (ppt[i].wordsShow) {
      for (let j = 0; j < ppt[i].wordsShow.length; j++) {
        text += '<div>' + ppt[i].wordsShow[j].word + '</div>';
      }
    } else {
      text = '暂无笔记';
    }

    words[i] = text;
  }
  return words;
}

function SpliceTxtHavePpt(data: any) {
  let imgTxtData: any = '';
  if (data.translation) {
    imgTxtData = textEditorAddTagP(data);
    const imgTxtTranslate: any = editorTranslation(data);
    for (let i = 0; i < imgTxtData.textArr.length; i++) {
      imgTxtData.textArr[i] = imgTxtData.textArr[i] + '\n\n\n' + imgTxtTranslate.textArr[i];
    }
  } else {
    imgTxtData = textEditor(data);
  }

  const imgTxt: object[] = [];
  const newWords: string[] = setWords(data.ppt);
  for (let i = 0; i < imgTxtData.timeArr.length; i++) {
    const img = data.ppt[i].image || 'defaut';
    imgTxt.push({
      onebest: imgTxtData.textArr[i] || '',
      bg: imgTxtData.timeArr[i] || data.ppt[i].timestamp * 1000,
      img: img,
      words: newWords[i],
    });
  }
  return imgTxt;
}

export function spliceTxt(data: any) {
  if (data === {}) {
    return { type: 'noData', imgTxt: {} };
  } else if (data.ppt.length !== 0) {
    return { type: 'havePpt', imgTxt: SpliceTxtHavePpt(data) };
  } else {
    const imgTxt = data.soundWord;
    return { type: 'missPpt', imgTxt };
  }
}
