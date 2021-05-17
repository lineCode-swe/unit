export interface ModifySpeedOutbound {
    speedToMongo(speed: number): Promise<void>;
}