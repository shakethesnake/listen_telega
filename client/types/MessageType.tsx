export interface Message {
    message_id: number | string;
    from: Record<string, string | number>;
    chat: Record<string, string | number>;
    date: number;
    text: string;
    entities: Record<string, string | number>[];
}