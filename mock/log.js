export default (req, res) => {
  const dataList = []
  for (let i = 1; i < 255; i++) {
    dataList.push({
      id: i,
      ip: '192.168.' + 255 - i + '.' + i,
      time: new Date().getTime() + 1000 * 60 * 30 * i,
      result: i % 3 === 0 ? '登录成功' : '登录失败'
    })
  }
  // req.body.pagenation = 
  pageSize = req.body.pagenation.pageSize || 10
  current = req.body.pagenation.current || 1
  
}