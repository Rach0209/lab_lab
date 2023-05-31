
const sldParser = function() {
    var _xml = '';
    // var style = {};
    let style = {
        layerNm : "tgd_li_popltn_cnt",
        name : "li_popltn_cnt",
        title : "li_popltn_cnt_jenks",
        options : ["jenks"],
        range : {
                    high : ["4944", "9931", "13306", "17734", "29728"],
                    low : ["3679", "4944", "9931", "13306", "17734"],
                    jenks : ["3679 - 4944", "4944 - 9931", "9931 - 13306", "13306 - 17734", "17734 - 29728"]
                },
        value : "all_popltn_cnt",
        color : ["#f7fbff", "#c8dcf0", "#73b2d8", "#2979b9", "#08306b"]
    }
    init();

    function init() {
        _xml = '';
        style = {};
    }

    this.readOptions = function(style, type) {
        this.style = style;

        if (type == 'string' || type == 'xml') {
            console.log(style);
            
            return this.baseXML(style, type);
        }
        return console.error("Types are 'string' or 'xml'...");
        
    },

    this.store = {
        info : `<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:se="http://www.opengis.net/se" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" version="1.1.0">`,
        namedLayer : `<NamedLayer><se:Name>`,
        userStyle : `</se:Name><UserStyle><se:Name>`,
        name : `</se:Name><se:FeatureTypeStyle>`,
        footer : `</se:FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`,
    },

    this.baseXML = function(style, type) {
        // 기본 xml 세팅(store.footer 제외)
        console.log("baseXML...");
        let storage = this.store;
        _xml += storage.info;
        _xml += storage.namedLayer + style.layerNm;
        _xml += storage.userStyle + style.name;
        _xml += storage.name;
        
        if (type == 'string') {
            return _xml;
        } else {
            // xmlparser 기본내장
            p = new DOMParser();
            _xml = p.parseFromString(_xml, "text/xml");
            return _xml;
        }
    },

    this.writeStringXml = function() {
       // _xml 합치는 부분 
        
    },

    this.setOption = function(style) {
        const optionStart = `<se:Rule>`;
        const optionEnd = `</se:Rule>`;
        const optionBody = '';
        const name = `<se:Name>,</se:Name>`;
        const title = `<se:Description><se:Title>,</se:Title></se:Description>`;
        // 옵션값 합치는 부분
        if (style.options == 'jenks') {
            let nm = name.replace(',', style.layerNm);
            let tt = title.replace(',', style.title);
            let propNm = `<ogc:Filter><ogc:And><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>,<ogc:/PropertyName>`;
            let a = `<ogc:Literal>,</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyIsLessThanOrEqualTo>`;
            let b = `<ogc:PropertyName>,</ogc:PropertyName>`;
            let c = `<ogc:Literal>,</ogc:Literal></ogc:PropertyIsLessThanEqualTo></ogc:And></ogc:Filter>`;
        }
    }



    
};

/* <sld:NamedLayer>
    <se:Name>tgd_grid_popltn_info</se:Name>
    <UserStyle>
      <se:Name>tgd_grid_popltn_info</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>0 - 0</se:Name>
          <se:Description>
            <se:Title>0 - 0</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>all_popltn_cnt</ogc:PropertyName>
                <ogc:Literal>0</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>all_popltn_cnt</ogc:PropertyName>
                <ogc:Literal>0</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#ffffff</se:SvgParameter>
              <se:SvgParameter name="fill-opacity">0.7</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#232323</se:SvgParameter>
              <se:SvgParameter name="stroke-opacity">0.7</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
        </se:FeatureTypeStyle>
    </UserStyle>
</sld:NamedLayer> */
