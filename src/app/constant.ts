export const oneEth = 1e18;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function generateRandomString(length: number): string {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return '0x' + result;
}
