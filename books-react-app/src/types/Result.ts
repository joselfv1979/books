export type Result<T, Err> = { success: true; value: T } | { success: false; message: Err };

