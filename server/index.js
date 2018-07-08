const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NaturalLanguageUnderstandingV1({
  username: '<YOUR-USERNAME>',
  password: '<YOUR-PASSWORD>',
  version_date: '2017-02-27',
})

function main(params) {
  const parameters = {
    url: params.url,
    features: {
      entities: {
        emotion: true,
        limit: 8,
      },
    },
  }

  return new Promise((resolve, reject) => {
    nlu.analyze(parameters, (err, response) => {
      if (err) {
        reject({
          status: 500,
          body: err,
        })
      } else {
        resolve({
          status: 200,
          body: response,
        })
      }
    })
  })
}
