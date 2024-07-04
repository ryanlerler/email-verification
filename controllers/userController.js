const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await this.model.findOne({
        where: {
          id,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  signUp = async (req, res) => {
    const {
      email,
      fistName,
      lastName,
      companyName,
      profilePicUrl,
      contactNo,
      jobTitle,
      jobRole,
      industry,
    } = req.body;
    try {
      const [user] = await this.model.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          fistName,
          lastName,
          companyName,
          profilePicUrl,
          contactNo,
          jobTitle,
          jobRole,
          industry,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateProfile = async (req, res) => {
    const {
      email,
      fistName,
      lastName,
      companyName,
      profilePicUrl,
      contactNo,
      jobTitle,
      jobRole,
      industry,
    } = req.body;

    const { id } = req.params;

    try {
      const userToEdit = await this.model.findOne({
        where: {
          id,
        },
      });

      const updatedUser = await userToEdit.update({
        email,
        fistName,
        lastName,
        companyName,
        profilePicUrl,
        contactNo,
        jobTitle,
        jobRole,
        industry,
      });
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = UserController;
