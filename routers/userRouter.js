const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, checkJwt) {
    this.checkJwt = checkJwt;
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.checkJwt, this.controller.getAll);
    router.get("/:id", this.checkJwt, this.controller.getOne);
    router.post("/", this.controller.signUp);
    router.post("/verify/:id", this.controller.sendVerificationEmail);
    router.put("/:id", this.checkJwt, this.controller.updateProfile);
    return router;
  };
}

module.exports = UserRouter;
