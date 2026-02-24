
export interface SendOtpBody {
  phone: string;
}

export interface VerifyOtpBody {
  phone: string;
  otp: string;
}

export interface GoogleAuthBody {
  idToken: string;
}