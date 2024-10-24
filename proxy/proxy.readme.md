# Proxy.jsp 설정
### Cesium에서 사용할 경우
- 내가 사용한 부분
```javascript
new Cesium.WebMapServiceImageryProvider({
  url : new Cesium.Resource({
    url: 'https://api.vworld.kr/req/wms?',
    proxy: new Cesium.DefaultProxy(proxyURL),
  }),

// proxyURL = '/proxy.jsp?URL=';
```
- vworld WMS API 를 사용중이다.
- proxy.jsp 를 한 번 거쳐서, CORS 위반을 방지
