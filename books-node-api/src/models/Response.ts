
export interface ResBody<T> {
    success: boolean;
    message?: string;
    errors?: string[];
    data: T
}