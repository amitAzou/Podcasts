function _schemaValidator (schema, paramsToValidate, res, next) {
  const result = schema.validate(paramsToValidate)
  if (result.error) {
    return res.status(400).send('The parameters passed are invalid')
  } else {
    next()
  }
}

function requestSchemeValidator (schema) {
  return (req, res, next) => {
    return _schemaValidator(schema, req.body, res, next)
  }
}

function urlParamsSchemeValidator (schema) {
  return (req, res, next) => {
    return _schemaValidator(schema, req.params, res, next)
  }
}

module.exports = {
  urlParamsSchemeValidator,
  requestSchemeValidator
}
