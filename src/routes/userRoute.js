"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/signup', userController_1.signupController);
router.post('/login', userController_1.loginController);
router.get('/checkAuth', userController_1.checkAuthController);
router.get('/logout', userController_1.logoutController);
router.get('/get-allUsers', userController_1.getAllUsers);
exports.default = router;
