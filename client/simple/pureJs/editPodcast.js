const savePodcast = async () => {
  try {
    const body = JSON.stringify(getBody())
    console.log(body)
    const info = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }
    await fetch('http://localhost:3000/podcast/1476069', info)
  } catch (err) {
  }
}

const getBody = () => {
  let res = {}
  if (document.getElementById('title').value !== '') {
    res = Object.assign(res, { title: document.getElementById('title').value })
  }
  if (document.getElementById('description').value !== '') {
    res = Object.assign(res, { description: document.getElementById('description').value })
  }
  if (document.getElementById('html').value !== '') {
    res = Object.assign(res, { htmlDescription: document.getElementById('html').value })
  }
  if (document.getElementById('web').value !== '') {
    res = Object.assign(res, { webUrl: document.getElementById('web').value })
  }
  if (document.getElementById('image').value !== '') {
    res = Object.assign(res, { imageUrl: document.getElementById('image').value })
  }
  if (document.getElementById('lang').value !== '') {
    res = Object.assign(res, { language: document.getElementById('lang').value })
  }
  if (document.getElementById('epNum').value !== '') {
    res = Object.assign(res, { numberOfEpisodes: document.getElementById('epNum').value })
  }
  if (document.getElementById('epAvg').value !== '') {
    res = Object.assign(res, { avgEpisodeLength: document.getElementById('epAvg').value })
  }
  if (document.getElementById('author').value !== '') {
    res = Object.assign(res, { author: document.getElementById('author').value })
  }
  if (document.getElementById('category').value !== '') {
    res = Object.assign(res, { category: document.getElementById('category').value })
  }
  return res
}
