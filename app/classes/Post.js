import axios from 'axios'

export default class Post
{
  constructor(url, { ...object })
  {
    this.post(url, { object })
  }

  async post(url, { object })
  {
    const res = await axios.post(
      url,
      {
        ...object
      },
      {
        headers:
        {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(res)
  }
}
