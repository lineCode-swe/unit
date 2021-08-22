export interface ModifyReceivedStartOutbound {
  receivedStartToMongo(received_start: boolean): Promise<void>;
}