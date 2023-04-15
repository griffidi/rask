/**
 * @constant {boolean} IS_DEV_MODE - Whether the application is running in development mode.
 */
export const IS_DEV_MODE: boolean = process.env?.['NODE_ENV'] !== 'production';
