
const automator = require('miniprogram-automator')

async function TestDemo() {
  const miniProgram = await automator.launch({
    cliPath: process.env.WE_CLI_PATH, // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
    projectPath: 'path/to/project', // 项目文件地址
  })
  await miniProgram?.remote() // 扫码登录连接真机，在真机上执行后续测试脚本

  const page = await miniProgram.reLaunch('/page/component/index')
  await page.waitFor(500)
  const element = await page.$('.kind-list-item-hd')
  console.log(await element.attribute('class'))
  await element.tap()

  await miniProgram.close()
}

TestDemo()
