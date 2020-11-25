export function isChecked(sex:string|null) {
  let sexNum = 0;
  if (sex!==null){
    switch (sex) {
      case '男':sexNum=0;break;
      case '女':sexNum=1;break;
      case '保密':sexNum=2;break
    }
  }
  return sexNum;
}

export function isLanuageSelect(val:string) {
  let i = 0;
  switch (val) {
    case '简体':i=0;break;
    case '繁体':i=1;break;
    case 'English':i=2;break;
  }
  return i;
}
