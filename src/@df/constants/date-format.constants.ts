export interface IDateFormatConstants {
    DATETIME_FORMAT: string;
}

export const DateTimeFormatConstants: IDateFormatConstants = {
    DATETIME_FORMAT: "yyyy-MM-dd'T'HH:mm:ss.SSS"
};

export const DateFormatConstants: IDateFormatConstants = {
    DATETIME_FORMAT: "EEEE, dd MMMM, yyyy"
};

export const TimeFormatConstants: IDateFormatConstants = {
    DATETIME_FORMAT: "HH:MM a"
};