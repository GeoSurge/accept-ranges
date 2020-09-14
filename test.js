const test = require("ava");
const acceptRanges = require("./index");

test("amazon s3 urls which support range requests, but don't return headers to indicate this", async (t) => {
  const url =
    "https://naip-analytic.s3.amazonaws.com/al/2017/100cm/rgbir/30085/m_3008501_ne_16_1_20171018.mrf";
  const result = await acceptRanges(url, { debug: false });
  t.true(result);
});

test("http-server --cors", async (t) => {
  const url = "http://localhost:8080";
  const result = await acceptRanges(url, { debug: false });
  t.true(result);
});

