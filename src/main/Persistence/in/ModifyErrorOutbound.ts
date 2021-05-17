export interface ModifyErrorOutbound {
    errorToMongo(error: string): Promise<void>;
}