enum HTTPMethods {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH",
}

enum ContentTypes {
  "css" = "text/css",
  "csv" = "text/csv",
  "html" = "text/html",
  "txt" = "text/plain",
  "js" = "application/javascript",
  "ogg" = "application/ogg",
  "pdf" = "application/pdf",
  "json" = "application/json",
  "xml" = "application/xml",
  "zip" = "application/zip",
  "x-www-form-urlencoded" = "application/x-www-form-urlencoded",
}

export { HTTPMethods, ContentTypes };
