export interface facebookPayload {
  client_id: string | undefined;
  redirect_uri: string | undefined;
  response_type: string;
  state: string;
}
