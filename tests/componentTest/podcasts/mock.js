
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

const mockedDataBaseForBestPodcasts = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
    title: 1,
    description: 'My third test',
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
]

const mockedReviewsForPodcasts = [
  {
    rating: 4,
    text: "Didn't like it that much",
    podcastId: 1,
    id: 51
  },
  {
    rating: 10,
    text: 'super',
    podcastId: 1,
    id: 51
  },
  {
    rating: 9,
    text: 'super',
    podcastId: 2,
    id: 51
  },
  {
    rating: 6,
    text: 'super',
    podcastId: 2,
    id: 51
  },
  {
    rating: 8,
    text: 'super',
    podcastId: 3,
    id: 51
  }
]

module.exports = { validObject, missingFieldsObject, extraFieldsObject, wrongFieldTypesObject, mockedDataBaseForBestPodcasts, mockedReviewsForPodcasts }
