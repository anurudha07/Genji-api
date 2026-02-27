import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "./auth.model";
import Otp from "./otp.model";
import { OAuth2Client } from "google-auth-library";
import env from "../../../config/env";

const SECRET_TOKEN = env.SECRET_TOKEN ?? "secret";
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID!;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const signToken = (userId: string) =>
    jwt.sign({ userId }, SECRET_TOKEN, { expiresIn: "30d" });


// service for send otp

export const sendOtpService = async (
    phone: string
): Promise<void> => {

    const existing = await Otp.findOne({ phone });

    // 🔴 blocked user cannot request new otp untill current time not exceeds blockedUnitl time
    if (existing?.blockedUntil && existing.blockedUntil > new Date()) {
        throw new Error(" Too many wrong attempts. Please try again after sometime :( ");
    }

    try {

        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // if not blocked bu exiting otp document then finding that and updating existing
        await Otp.findOneAndUpdate(
            { phone },
            {
                $set: {
                    otp,
                    expiresAt: new Date(Date.now() + 30 * 1000),
                    wrongAttempts: 0,
                    blockedUntil: null
                }
            },
            { upsert: true, returnDocument: "after" }
        );

        console.log("OTP:", otp); // simulate via sms
    } catch {
        throw new Error("Unable to generate OTP");
    }
};


// service for verify otp

export const verifyOtpService = async (
    phone: string,
    otp: string
): Promise<string> => {

    const record = await Otp.findOne({ phone });

    if (!record)
        throw new Error("OTP not found");

    // 🔴 if curent time didn't exceed blockedUntil time => locked till blockedUntil time
    if (record.blockedUntil && record.blockedUntil > new Date())
        throw new Error(" Too many wrong attempts. Please try after sometime :( ");

    // otp expiry
    if (record.expiresAt < new Date())
        throw new Error("OTP expired");

    // 🔴 wrong otp → count attempts for wrong OTP
    if (record.otp !== otp) {

        record.wrongAttempts++;

        // block after 3 wrong tries
        if (record.wrongAttempts >= 3) {
            record.blockedUntil = new Date(Date.now() + 2 *60 * 1000);
            record.expiresAt = record.blockedUntil;  // keep document alive till block expires
        }

        await record.save();

        throw new Error("Pleae provide valid OTP!");
    }

    await Otp.deleteOne({ phone });   // after success delete the existing otp doc in otp collection

    const user = await User.findOneAndUpdate(
        { phone },
        { $setOnInsert: { phone } },     // set field when new document is created 
        { upsert: true, returnDocument: "after" }
    );


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

