const BaseController = require("./baseController");
const axios = require("axios").default;

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
      password,
      firstName,
      lastName,
      companyName,
      profilePicUrl,
      contactNo,
      jobTitle,
      jobRole,
      industry,
    } = req.body;

    try {
      // Create user in Auth0
      const { data } = await axios.post(
        `https://${process.env.AUTH_DOMAIN}/dbconnections/signup`,
        {
          email,
          password, // Need not to be hashed as Auth0 will hash it
          connection: "Username-Password-Authentication",
          user_metadata: { firstName, lastName },
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${process.env.AUTH_MANAGEMENT_API_ACCESS_TOKEN}`,
          },
        }
      );

      console.log("Auth0 Response:", data);

      // Create user in db
      const [user] = await this.model.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          firstName,
          lastName,
          companyName,
          profilePicUrl,
          contactNo,
          jobTitle,
          jobRole,
          industry,
          auth0UserId: `auth0|${data._id}`,
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

  sendVerificationEmail = async (req, res) => {
    const { id } = req.params;

    const user = await this.model.findOne({
      where: {
        id,
      },
    });

    const options = {
      method: "POST",
      url: `https://${process.env.AUTH_DOMAIN}/api/v2/jobs/verification-email`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.AUTH_MANAGEMENT_API_ACCESS_TOKEN}`,
      },
      data: {
        user_id: user.auth0UserId,
      },
    };

    try {
      const { data } = await axios.request(options);
      res.status(200).json({ message: "Verification email sent", data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.response.data });
    }
  };
}

module.exports = UserController;
