import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "./auth.model";
import Otp from "./otp.model";
import { OAuth2Client } from "google-auth-library";

const SECRET_TOKEN = process.env.SECRET_TOKEN ?? "secret";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const signToken = (userId: string) =>
    jwt.sign({ userId }, SECRET_TOKEN, { expiresIn: "30d" });


// send otp

export const sendOtpService = async (
    phone: string
): Promise<void> => {
    try {
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        await Otp.deleteMany({ phone });

        await Otp.create({
            phone,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("OTP:", otp); // simulate via sms
    } catch {
        throw new Error("Unable to generate OTP");
    }
};

// verify otp

export const verifyOtpService = async (
    phone: string,
    otp: string
): Promise<string> => {

        const record = await Otp.findOne({ phone });

        if (!record)
            throw new Error("OTP not found");
        if (record.otp !== otp)
            throw new Error("Invalid OTP");
        if (record.expiresAt < new Date())
            throw new Error("OTP expired");

        await Otp.deleteMany({ phone });

        let user = await User
            .findOne({ phone });

        if (!user) {
            user = await User
                .create({ phone });
        }


        return signToken(user.id);
};

// google login

export const googleLoginService = async (idToken: string): Promise<string> => {

        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload?.email)
            throw new Error("Google email not found");

        let user = await User.findOne({ email: payload.email });

        if (!user)
            user = await User.create({
                email: payload.email,
                name: payload.name,
            });

        return signToken(user.id);
};

