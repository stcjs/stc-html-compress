import Plugin from 'stc-plugin';
import {extend, md5} from 'stc-helper';
import uglify from 'stc-uglify';

let options = null;
let tplOptions = null;

export default class HtmlCompressPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    if(!options){
      options = extend({}, this.config.tpl);
      options = extend(options, this.options);
      options.jsTplTypeList = this.config.jsTpl.type;
    }

    let tokens = await this.getAst();
    
    let instance = new this.stc.flkit.HtmlCompress(tokens, options);
    instance.jsTplHandle = this.compressJsTpl.bind(this);
    instance.cssHandle = this.compressInlineCss.bind(this);
    let result = instance.run(true);
    
    //compress inline script
    if(options.compressInlineJs !== false){
      result = await this.compressInlineJs(result);
    }

    return result;
  }
  /**
   * compress css
   */
  compressInlineCss(token){
    let value = token.ext.tokens || token.value;
    let instance = new this.stc.flkit.CssCompress(value, options);
    let ret = instance.run(true);
    token.ext.tokens = ret;
    return token;
  }
  /**
   * compress inline js
   */
  async compressInlineJs(tokens){
    let promises = tokens.map(async (token) => {
      if(token.type !== this.TokenType.HTML_TAG_SCRIPT){
        return token;
      }
      let {start, content} = token.ext;
      if(start.ext.isScript && !start.ext.isExternal){
        let value = content.value;
        let filename = '/stc/' + md5(value) + '.js';
        let file = await this.addFile(filename, value, true);
        let compressRet = await this.invokePlugin(uglify, file);
        content.value = compressRet.content;
      }
      return token;
    });
    return Promise.all(promises);
  }
  /**
   * compress js tpl
   */
  compressJsTpl(token){
    if(!tplOptions){
      tplOptions = extend({}, this.config.jsTpl);
      options = extend(options, this.options);
    }
    let value = token.ext.tokens || token.value;
    let instance = new this.stc.flkit.HtmlCompress(value, tplOptions);
    token.ext.tokens = instance.run(true);
    return token;
  }
  /**
   * update
   */
  update(tokens){
    this.setAst(tokens);
  }
  /**
   * use cluster
   */
  static cluster(){
    return false;
  }
  /**
   * use cache
   */
  static cache(){
    return true;
  }
}