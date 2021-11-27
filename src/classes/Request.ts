import http from "http";

export default (req: http.IncomingMessage) => {
  return {
    ...req,
  };
};
