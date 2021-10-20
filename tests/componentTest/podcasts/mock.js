
const validObject = {
  title: "Amit's Test",
  description: 'My second test',
  htmlDescription: '<p>Test.</p>',
  webUrl: 'https://test.com',
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 9,
  avgEpisodeLength: 2000,
  author: 'Amit Azoulay',
  category: 'Software'
}

const missingFieldsObject = {
  title: "Amit's Test",
  description: 'My second test',
  htmlDescription: '<p>Test.</p>',
  webUrl: 'https://test.com',
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 9,
  avgEpisodeLength: 2000,
  author: 'Amit Azoulay'
}

const extraFieldsObject = {
  title: "Amit's Test",
  description: 'My second test',
  htmlDescription: '<p>Test.</p>',
  webUrl: 'https://test.com',
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 9,
  avgEpisodeLength: 2000,
  author: 'Amit Azoulay',
  category: 'Software',
  extraField: 'extra'
}

const wrongFieldTypesObject = {
  title: 1,
  description: 'My second test',
  htmlDescription: '<p>Test.</p>',
  webUrl: 'https://test.com',
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 2,
  numberOfEpisodes: 9,
  avgEpisodeLength: 2000,
  author: 'Amit Azoulay',
  category: 'Software',
  extraField: 'extra'
}

module.exports = { validObject, missingFieldsObject, extraFieldsObject, wrongFieldTypesObject }
