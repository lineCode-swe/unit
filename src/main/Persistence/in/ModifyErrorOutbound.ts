export interface ModifyErrorOutbound {
    errorToMongo(error: number): Promise<void>;
}
