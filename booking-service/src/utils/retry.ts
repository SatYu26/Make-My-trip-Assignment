export async function retry<T>(
    fn: () => Promise<T>,
    retries = 5,
    delay = 2000
): Promise<T> {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            console.log(`[Retry] Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }

    throw new Error(`Failed after ${retries} attempts.`);
}
