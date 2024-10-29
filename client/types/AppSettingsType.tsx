export interface AppSettings {
    getByKey: (key: string): string => import.meta.env[key];
}