"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.checkAuthController = exports.logoutController = exports.loginController = exports.signupController = void 0;
const UserModal_1 = __importDefault(require("../Model/UserModal"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { username, email, password } = req.body;
        const userNameExists = yield UserModal_1.default.findOne({ username: username });
        if (userNameExists) {
            throw new Error("Username is already taken!!");
        }
        const emailExists = yield UserModal_1.default.findOne({ email: email });
        console.log("🚀 ~ signupController ~ emailExists:", emailExists);
        if (emailExists) {
            throw new Error("Email already exists!!");
        }
        password = yield bcrypt_1.default.hash(password, 10);
        console.log(req.body, ` in signup controller `);
        const user = yield new UserModal_1.default({
            username,
            email,
            password,
            joinedDate: Date.now(),
        }).save();
        const token = jsonwebtoken_1.default.sign({ username: user.username, email: user.email, id: user.id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "He", {
            expiresIn: "48h",
        });
        console.log("🚀 ~ signupController ~ token:", token);
        console.log("true");
        res.cookie("token", token, { httpOnly: true, maxAge: 1.728e8 });
        delete user.password;
        res
            .status(200)
            .json({ status: true, message: "Successfully registered", user });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: false, err: err.message });
    }
});
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { email, password } = req.body;
        console.log(req.body, " body of login for testing 🛹");
        const userData = yield UserModal_1.default.findOne({ email: email });
        if (!userData) {
            throw new Error("User not exists");
        }
        const passwordComparison = yield bcrypt_1.default.compare(password, userData.password);
        if (!passwordComparison) {
            throw new Error("Incorrect email or password");
        }
        const token = jsonwebtoken_1.default.sign({ username: userData.username, email: userData.email, id: userData._id }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "He", {
            expiresIn: "48h",
        });
        console.log(token);
        res.cookie("token", token, { httpOnly: true, maxAge: 1.728e8 });
        res.json({ status: true, message: "Successfully logined", user: userData });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ status: false, err: error.message });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.json({ status: true, message: "Logout Successfull!!", user: null });
    }
    catch (error) {
        res.status(400).json({ status: false, err: error.message, user: null });
        console.log(error);
    }
});
exports.logoutController = logoutController;
const checkAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = req.cookies.token;
        if (token) {
            jsonwebtoken_1.default.verify(token, (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "He", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    throw err;
                }
                console.log(decoded);
                const user = yield UserModal_1.default.findById(decoded.id);
                res.status(200).json({ status: true, message: "Successful", user });
            }));
        }
        else {
            throw new Error("Your session cleared");
        }
    }
    catch (error) {
        res.status(400).json({ status: false, err: error.message, user: null });
    }
});
exports.checkAuthController = checkAuthController;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myId = req.query.id;
        const users = yield UserModal_1.default.find({ _id: { $ne: myId } });
        res.status(200).json({ status: true, users });
    }
    catch (error) {
        res.status(400).json({ status: true, err: error.message, users: false });
    }
});
exports.getAllUsers = getAllUsers;
