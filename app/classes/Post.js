import axios from 'axios'

export default class Post
{
  constructor(url, { ...object })
  {
    this.url = url
    this.object = { object }

    this.res = this.post(this.url, this.object)
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
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
