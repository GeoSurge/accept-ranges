const crossFetch = require("cross-fetch");

// checking if the server supports range requests
module.exports = async (url, { debug = false, fetch = crossFetch } = { debug: false, fetch: crossFetch }) => {
  if (debug) console.log("[accept-ranges] starting with", url, { debug, fetch });

  if (!url) {
    throw new Error("[accept-ranges] no url was provided");
  }

  // aws s3 supports byte range requets,
  // but sometimes doesn't send Accept-Ranges header
  if (url.includes(".amazonaws.")) {
    if (debug) console.log("[accept-ranges] url includes .amazonaws., so assuming that it supports range requests");
    return true;
  }

  if (debug) console.log("[accept-ranges] sending a HEAD request to", url);
  const head = await fetch(url, { method: "HEAD" });
  if (debug) console.log("[accept-ranges] received a response", head);

  const { headers } = head;
  if (debug) console.log("[accept-ranges] response headers are", headers);

  if (headers.get("access-control-allow-headers")) {
    const allowed = headers.get("access-control-allow-headers").toString();
    if (allowed.includes("Range")) {
      if (debug)
        console.log(
          '[accept-ranges] "Range" was found in the access-control-allow-headers header of the response to the HEAD request, so returning true'
        );
      return true;
    }
  }

  if (headers.get("Accept-Ranges")) {
    if (debug) console.log('[accept-ranges] "Accept-Ranges" header is present');
    if (headers.get("Accept-Ranges").toString().toLowerCase().trim() === "bytes") {
      if (debug) console.log('[accept-ranges] "Accept-Ranges" is equal to "bytes", so returning true');
      return true;
    }
  }

  if (headers.get("accept-ranges")) {
    if (debug) console.log('[accept-ranges] "accept-ranges" header is present');
    if (headers.get("accept-ranges").toString().toLowerCase().trim() === "bytes") {
      if (debug) console.log('[accept-ranges] "accept-ranges" is equal to "bytes", so returning true');
      return true;
    }
  }

  return false;
};
