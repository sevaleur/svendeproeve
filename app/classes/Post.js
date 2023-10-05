import axios from 'axios'

export default class Post
{
  constructor(url, { ...object })
  {
    this.res = this.post(
      url,
      { object }
    )
  }

  async post(url, { object })
  {
    return await axios.post(
      url,
      {
        ...object
      },
      {
        headers:
        {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}
