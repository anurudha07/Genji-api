import { COMPLETION_FIELDS } from "../modules/app/profile/profile.constants";
import { IProfile } from "../modules/app/profile/profile.types";

export const calcCompletion = (profile: IProfile): number => {
    let filled = 0;
    for (const field of COMPLETION_FIELDS) {
        const val = profile[field];
        if (Array.isArray(val) && val.length > 0) filled++;
        else if (!Array.isArray(val) && val) filled++;
    }
    return Math.round((filled / COMPLETION_FIELDS.length) * 100);
};