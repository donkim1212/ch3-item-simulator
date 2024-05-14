const isNotNumber = /[^0-9]/;

const itemValidator = {
  itemCodeValidation: (req, res, next) => {
    const item_code = req.body.item_code || req.params.item_code;
    if (isNotNumber.test(item_code)) return res.status(400).json({ errorMessage: `Invalid item_code: ${item_code}` });
    next();
  },
  itemNameValiation: (req, res, next) => {
    const { item_name } = req.body;
    if (!item_name) return res.status(400).json({ errorMessage: `Invalid item_name: ${item_name}` });
    next();
  },
  itemStatValidation: (req, res, next) => {
    const { item_stat } = req.body || { item_stat: {} };
    if (!item_stat.health) item_stat.health = 0;
    if (!item_stat.power) item_stat.power = 0;

    if (isNotNumber.test(item_stat.health)) {
      return res.status(400).json({ errorMessage: `Invalid health: ${item_stat.health}` });
    }
    if (isNotNumber.test(item_stat.power)) {
      return res.status(400).json({ errorMessage: `Invalid power: ${item_stat.power}` });
    }

    req.body.item_stat = item_stat;
    next();
  },
};

export default itemValidator;
