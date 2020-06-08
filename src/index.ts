import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";
import config from "./config";
import * as validatorMiddleware from "./middleware/validator";
import * as authController from "./controllers/auth";
import * as imageUpdater from "./controllers/imageUpdate";
import * as blockUser from "./controllers/blockUser";

const app = express();
// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(
  morgan(
    ':response-time ms - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  )
);

(async () => {
  try {
    const connection = await createConnection();
    console.log("Connection to Database establised");
  } catch (err) {
    console.log("DB connection error : : " + err);
  }

  // Register User
  app.post(
    "/register",
    validatorMiddleware.register,
    authController.register,
    validatorMiddleware.checkJwt
  );
  app.post("/login",validatorMiddleware.checkJwt, authController.login);

  // Update image passing email and image url
  app.post(
    "/image/update",
    validatorMiddleware.login,
    imageUpdater.updateImage
  );

  app.post(
    "/block/user",
    blockUser.userBlock
  )

  app.post("*", (req, res) => {
    res.status(404).json({
      error: true,
      message: "Not found",
    });
  });

  const port = config.PORT || 3000;

  app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
  });
})();

export default app;
/**
 * Create a basic dating app which should contain following features:-
 * -------------------------------------------------------------------------------------------------------
 *    Test users loading: You can load test users with 10 images in the database.
 *    Sign up api : Basic email and password based registration
 *    login api : Jwt based login with email and password
 * -------------------------------------------------------------------------------------------------------
 *    Image like api : Whenever someone like other user image, a socket io notification will sent to other user but image of person who liked should not be visible to who is being liked
 *    Block api: When a user block another user then his/her image should not be shown while blocked user is scrolling random images
 */
