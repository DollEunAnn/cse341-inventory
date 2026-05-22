const validator = require('../helpers/validate');

const saveSupplier = (req, res, next) => {
  const validationRule = {
    supplierName: 'required|string',
    supplierAddress: 'required|string',
    supplierTelephone: 'required|string',
    supplierPersonel: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
    saveSupplier
};