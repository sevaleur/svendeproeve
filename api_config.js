const api = {
  oneday: 1000 * 60 * 60 * 24,
  headers:
  {
    headers:
    {
      'Content-Type': 'application/json'
    }
  },
  tables:
  {
    images:
      [
        './assets/table/table_1.png',
        './assets/table/table_2.png',
        './assets/table/table_3.png'
      ],
    positions:
      [
        '1', '1', '2', '1', '3',
        '1', '1', '2', '1', '3',
        '1', '1', '2', '1', '3',
      ]
  }
}

module.exports = api
