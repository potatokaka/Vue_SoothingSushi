module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Vue_SoothingSushi/' // 資料夾路徑(gitHub 上 repo 的名稱)
      : '/'
}
