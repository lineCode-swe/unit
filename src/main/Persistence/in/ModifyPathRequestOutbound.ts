export interface ModifyPathRequestOutbound {
    pathRequestToMongo(pathRequest: boolean): Promise<void>;
}