const validReviewObject = {
  rating: 10,
  text: 'This test is amazing',
  podcastId: 1,
  id: 70
}

const missingFieldsReviewObject = {
  rating: 10,
  text: 'oops, missing fields',
  podcastId: 1
}

const invalidFieldsReviewObject = {
  rating: 12,
  text: 'invalid fields',
  podcastId: 1,
  id: 70
}

const notExistingPodcast = {
  rating: 2,
  text: 'doesnt exist',
  podcastId: 2,
  id: 70
}

module.exports = { validReviewObject, missingFieldsReviewObject, invalidFieldsReviewObject, notExistingPodcast }
