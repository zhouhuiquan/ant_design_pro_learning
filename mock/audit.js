const organizationData = [
  {
    value: 100,
    label: '省直属',
    children: [
      {
        value: 2100001,
        label: '省公安厅',
      },
      {
        value: 2100002,
        label: '省检察院',
      },
      {
        value: 2100003,
        label: '省财政厅',
      }
    ]
  },
  {
    value: 101,
    label: '长沙市',
    children: [
      {
        value: 2101001,
        label: '长沙市公安局'
      },
      {
        value: 2101002,
        label: '长沙市检察院'
      },
      {
        value: 2101003,
        label: '长沙市财政局'
      }
    ]
  }
]

const getAuditLog = (req, res) => {

}

export default {
  organizationData,
  getAuditLog
}