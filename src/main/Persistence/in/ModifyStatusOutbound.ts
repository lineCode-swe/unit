export interface ModifyStatusOutbound {
    statusToMongo(status: string): Promise<void>;
}