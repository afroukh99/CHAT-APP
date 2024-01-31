import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const register = async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (user) {
            return res.status(409).send("User with the given username or email already exists!");
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hash });
        const savedUser = await newUser.save();
        return res.status(201).send("Account created successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
export const login = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) { return res.status(404).send("User not found") };
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) { return res.status(400).send("Password is incorrect ! try again") }
        console.log(user._id)
        const token = jwt.sign({ userId: user._id }, process.env.SECRT_KEY)
        const { password, ...infos } = user._doc
        res.cookie("access_token", token,
            {
                httpOnly: true,
            }
        )
            .status(200)
            .send(infos)
    } catch (error) {
        console.log(error)
    }
}


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        samSite: "none",
        secure: true
    })
        .status(200)
        .send("User has been logged out")
}