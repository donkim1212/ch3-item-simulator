const characterValidator = {
  characterIdValidation: (req, res, next) => {
    const cid = req.params.character_id;
    // cid === undefined || cid === null || typeof cid != "number"
    if (!cid) {
      return res.status(400).json({
        errorMessage: `Invalid character_id: ${cid}`,
      });
    }
    next();
  },

  characterNameValidation: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        errorMessage: `Invalid name: ${name}`,
      });
    }
    next();
  },
};

export default characterValidator;
