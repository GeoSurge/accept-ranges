# accept-ranges
Check if a URL accepts HTTP Range Requests

# install
```bash
npm install accept-ranges
```

# usage
```javascript
import acceptRanges from 'accept-ranges';

const urlAcceptsRangeRequests = acceptRanges("https://naip-analytic.s3.amazonaws.com/al/2017/100cm/rgbir/30085/m_3008501_ne_16_1_20171018.mrf");
// urlAcceptsRangeRequests is true
```

# debugging
If you would like logging of the requests being made, you can pass in `{ debug: true }`
```javascript
import acceptRanges from 'accept-ranges';

const urlAcceptsRangeRequests = acceptRanges(url, { debug: true });
```

# custom fetching
This library uses [cross-fetch](https://www.npmjs.com/package/cross-fetch) by default for issuing the head
request to check if a url supports byte range requests.  If you'd like to use your own fetching library,
pass in a fetch parameter to the options object like `acceptRanges(url, { fetch: otherFetchFunction })`
