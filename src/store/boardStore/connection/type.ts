export type Connection = {
  from: string;
  to: string;
};

export type ConnectionBinding = {
  hasView: boolean;
  connectionData: Connection;
};
