import{D as e,L as t,P as n,Q as r,S as i,T as a,W as o,Y as s,h as c,i as l,k as u,q as d,v as f,w as p,x as m,y as h}from"./app-Bfi1ITMI.js";var g={class:`tool`},_={class:`tool-tabs`,role:`tablist`,"aria-label":`转换类型`},v=[`aria-selected`],y=[`aria-selected`],b={class:`panels`},x={role:`tabpanel`},S={class:`format-options`},C={class:`format-rule`},w=[`value`],T={key:1,class:`meta`},E={class:`actions`},ee=[`disabled`],te={role:`tabpanel`},ne={class:`actions`},re=[`disabled`],D=[`disabled`],O=[`src`],ie={key:1,class:`file-result`},k={key:2,class:`meta`},A=[`href`,`download`],j={key:0,class:`error`},M=l(u({__name:`ImageBase64Tool`,setup(l){let u=d(``),M=d(null),N=d(!1),P=d(!1),F=d(``),I=d(``),L=d(0),R=d(``),z=d(0),B=d(``),V=d(``),H=d(``),U=d(!1),W=d(`encode`),G=d(`data-url`),K={jpg:`image/jpeg`,jpeg:`image/jpeg`,png:`image/png`,gif:`image/gif`,bmp:`image/bmp`,webp:`image/webp`,svg:`image/svg+xml`,ico:`image/x-icon`,avif:`image/avif`,tif:`image/tiff`,tiff:`image/tiff`,heic:`image/heic`,heif:`image/heif`,pdf:`application/pdf`,ofd:`application/ofd`,txt:`text/plain`,csv:`text/csv`,json:`application/json`,xml:`application/xml`,html:`text/html`,css:`text/css`,js:`text/javascript`,md:`text/markdown`,doc:`application/msword`,docx:`application/vnd.openxmlformats-officedocument.wordprocessingml.document`,xls:`application/vnd.ms-excel`,xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,ppt:`application/vnd.ms-powerpoint`,pptx:`application/vnd.openxmlformats-officedocument.presentationml.presentation`,zip:`application/zip`,rar:`application/vnd.rar`,"7z":`application/x-7z-compressed`,gz:`application/gzip`,mp3:`audio/mpeg`,wav:`audio/wav`,ogg:`audio/ogg`,mp4:`video/mp4`,webm:`video/webm`},q=Object.entries(K).reduce((e,[t,n])=>(e[n]||=t,e),{}),J=e=>e.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1]||``,ae=e=>e.type||K[J(e.name)]||`application/octet-stream`,oe=e=>e.replace(/[\\/:*?"<>|\u0000-\u001f]/g,`_`).trim()||`base64-file`,se=e=>encodeURIComponent(e).replace(/'/g,`%27`),Y=m(()=>{if(!u.value)return``;if(G.value===`base64`)return u.value.slice(u.value.indexOf(`,`)+1);let e=u.value.indexOf(`,`);return`${u.value.slice(0,e).replace(/;base64$/i,`;name=${se(I.value)};base64`)}${u.value.slice(e)}`}),ce=m(()=>new Blob([Y.value]).size),le=m(()=>B.value.startsWith(`image/`)),X=m(()=>V.value||`base64-file.${q[B.value]||`bin`}`),Z=e=>e<1024?`${e} B`:e<1024**2?`${(e/1024).toFixed(1)} KB`:e<1024**3?`${(e/1024**2).toFixed(2)} MB`:`${(e/1024**3).toFixed(2)} GB`,Q=e=>{e&&URL.revokeObjectURL(e)},$=e=>{if(!e)return;H.value=``,U.value=!1;let t=new FileReader;t.onload=()=>{u.value=String(t.result||``),I.value=e.name,L.value=e.size,R.value=ae(e),!e.type&&u.value.startsWith(`data:application/octet-stream`)&&(u.value=u.value.replace(`data:application/octet-stream`,`data:${R.value}`))},t.onerror=()=>{H.value=`文件读取失败，请重新选择。`},t.readAsDataURL(e)},ue=async()=>{try{await navigator.clipboard.writeText(Y.value),U.value=!0,window.setTimeout(()=>U.value=!1,1500)}catch{H.value=`复制失败，请手动复制。`}},de=e=>new Promise((t,n)=>{let r=String.raw`
    const mimeExtensions = {
      "image/jpeg":"jpg","image/png":"png","image/gif":"gif","image/bmp":"bmp","image/webp":"webp",
      "image/svg+xml":"svg","image/x-icon":"ico","image/avif":"avif","image/tiff":"tiff",
      "image/heic":"heic","image/heif":"heif","application/pdf":"pdf","application/ofd":"ofd",
      "application/zip":"zip","application/vnd.rar":"rar","application/x-7z-compressed":"7z","application/gzip":"gz",
      "application/msword":"doc","application/vnd.ms-excel":"xls","application/vnd.ms-powerpoint":"ppt",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":"docx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"xlsx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":"pptx",
      "text/plain":"txt","text/csv":"csv","application/json":"json","application/xml":"xml","text/html":"html",
      "audio/mpeg":"mp3","audio/wav":"wav","audio/ogg":"ogg","video/mp4":"mp4","video/webm":"webm"
    };
    const starts = (bytes, values) => values.every((value, index) => bytes[index] === value);
    const ascii = (bytes, start, length) => String.fromCharCode(...bytes.slice(start, start + length));
    const detectOle = (bytes) => {
      const directoryText = new TextDecoder("utf-16le").decode(bytes.slice(0, Math.min(bytes.length, 16 * 1024 * 1024)));
      if (directoryText.includes("WordDocument")) return ["application/msword","doc"];
      if (directoryText.includes("Workbook") || directoryText.includes("Book")) return ["application/vnd.ms-excel","xls"];
      if (directoryText.includes("PowerPoint Document")) return ["application/vnd.ms-powerpoint","ppt"];
      return ["application/vnd.ms-office","doc"];
    };
    const detectZip = (bytes) => {
      const limit = Math.min(bytes.length, 4 * 1024 * 1024);
      let text = "";
      for (let start = 0; start < limit; start += 32768) text += ascii(bytes, start, Math.min(32768, limit - start));
      if (bytes.length > limit) {
        const tailStart = Math.max(limit, bytes.length - limit);
        for (let start = tailStart; start < bytes.length; start += 32768) text += ascii(bytes, start, Math.min(32768, bytes.length - start));
      }
      const lowerText = text.toLowerCase();
      if (lowerText.includes("ofd.xml")) return ["application/ofd", "ofd"];
      if (lowerText.includes("word/")) return ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"];
      if (lowerText.includes("xl/")) return ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"];
      if (lowerText.includes("ppt/")) return ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"];
      return ["application/zip", "zip"];
    };
    const detectText = (bytes) => {
      const sample = bytes.slice(0, Math.min(bytes.length, 8192));
      if (sample.includes(0)) return null;
      try {
        const text = new TextDecoder("utf-8", { fatal: true }).decode(sample).trimStart();
        if (/^<svg[\s>]/i.test(text) || /^<\?xml[^>]*>\s*<svg[\s>]/i.test(text)) return ["image/svg+xml", "svg"];
        if (/^[\[{]/.test(text)) { try { JSON.parse(new TextDecoder().decode(bytes)); return ["application/json", "json"]; } catch {} }
        if (/^<!doctype html|^<html[\s>]/i.test(text)) return ["text/html", "html"];
        if (/^<\?xml|^<[A-Za-z_][\w:.-]*(?:\s|>)/.test(text)) return ["application/xml", "xml"];
        return ["text/plain", "txt"];
      } catch { return null; }
    };
    const detect = (bytes) => {
      if (starts(bytes,[0xff,0xd8,0xff])) return ["image/jpeg","jpg"];
      if (starts(bytes,[0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])) return ["image/png","png"];
      if (ascii(bytes,0,6) === "GIF87a" || ascii(bytes,0,6) === "GIF89a") return ["image/gif","gif"];
      if (ascii(bytes,0,2) === "BM") return ["image/bmp","bmp"];
      if (ascii(bytes,0,4) === "RIFF" && ascii(bytes,8,4) === "WEBP") return ["image/webp","webp"];
      if (starts(bytes,[0x00,0x00,0x01,0x00])) return ["image/x-icon","ico"];
      if (ascii(bytes,4,8).includes("ftypavif")) return ["image/avif","avif"];
      if (starts(bytes,[0x49,0x49,0x2a,0x00]) || starts(bytes,[0x4d,0x4d,0x00,0x2a])) return ["image/tiff","tiff"];
      if (/ftyp(?:heic|heix|hevc|hevx|mif1)/.test(ascii(bytes,4,12))) return ["image/heic","heic"];
      if (ascii(bytes,0,5) === "%PDF-") return ["application/pdf","pdf"];
      if (starts(bytes,[0x50,0x4b,0x03,0x04]) || starts(bytes,[0x50,0x4b,0x05,0x06]) || starts(bytes,[0x50,0x4b,0x07,0x08])) return detectZip(bytes);
      if (starts(bytes,[0x52,0x61,0x72,0x21,0x1a,0x07])) return ["application/vnd.rar","rar"];
      if (starts(bytes,[0x37,0x7a,0xbc,0xaf,0x27,0x1c])) return ["application/x-7z-compressed","7z"];
      if (starts(bytes,[0x1f,0x8b])) return ["application/gzip","gz"];
      if (starts(bytes,[0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1])) return detectOle(bytes);
      if (ascii(bytes,0,3) === "ID3" || starts(bytes,[0xff,0xfb]) || starts(bytes,[0xff,0xf3]) || starts(bytes,[0xff,0xf2])) return ["audio/mpeg","mp3"];
      if (ascii(bytes,0,4) === "RIFF" && ascii(bytes,8,4) === "WAVE") return ["audio/wav","wav"];
      if (ascii(bytes,0,4) === "OggS") return ["audio/ogg","ogg"];
      if (ascii(bytes,4,4) === "ftyp") return ["video/mp4","mp4"];
      if (starts(bytes,[0x1a,0x45,0xdf,0xa3])) return ["video/webm","webm"];
      return detectText(bytes) || ["application/octet-stream","bin"];
    };
    self.onmessage = ({ data: value }) => {
      try {
        let payload = value.trim();
        let declaredMime = "";
        let fileName = "";
        if (/^data:/i.test(payload)) {
          const commaIndex = payload.indexOf(",");
          if (commaIndex < 0) throw new Error("Data URL 缺少内容分隔符。 ");
          const metadata = payload.slice(5, commaIndex);
          if (!/;base64(?:;|$)/i.test(metadata)) throw new Error("请输入 Base64 格式的 Data URL。 ");
          const parts = metadata.split(";");
          declaredMime = (parts[0] || "application/octet-stream").toLowerCase();
          const namePart = parts.find((part) => /^name=/i.test(part));
          if (namePart) { try { fileName = decodeURIComponent(namePart.slice(5)); } catch {} }
          payload = payload.slice(commaIndex + 1);
        }
        if (/\s/.test(payload)) payload = payload.replace(/\s+/g, "");
        if ((!payload && !declaredMime) || payload.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)) throw new Error("Base64 编码格式不正确。 ");
        const binary = atob(payload);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        const detected = detect(bytes);
        const genericMime = !declaredMime || declaredMime === "application/octet-stream" || declaredMime === "application/zip" || declaredMime === "application/x-zip-compressed";
        const mime = genericMime ? detected[0] : declaredMime;
        const extension = mimeExtensions[mime] || detected[1] || "bin";
        self.postMessage({ buffer: bytes.buffer, mime, fileName, extension }, [bytes.buffer]);
      } catch (error) {
        self.postMessage({ error: error instanceof Error ? error.message : "Base64 解码失败。" });
      }
    };
  `,i=URL.createObjectURL(new Blob([r],{type:`text/javascript`})),a=new Worker(i),o=()=>{a.terminate(),URL.revokeObjectURL(i)};a.onmessage=({data:e})=>{o(),e.error||!e.buffer||!e.mime?n(Error(e.error||`Base64 解码失败。`)):t({buffer:e.buffer,mime:e.mime,fileName:e.fileName||``,extension:e.extension||`bin`})},a.onerror=()=>{o(),n(Error(`Base64 解码失败。`))},a.postMessage(e)}),fe=async()=>{H.value=``,P.value=!0;try{let e=M.value?.value||``;if(!e.trim())throw Error(`请输入 Base64 内容。 `);await new Promise(e=>requestAnimationFrame(()=>e()));let{buffer:t,mime:n,fileName:r,extension:i}=await de(e),a=new Blob([t],{type:n});Q(F.value),F.value=URL.createObjectURL(a),z.value=a.size,B.value=n,V.value=r?oe(r):`base64-file-${Date.now()}.${i}`}catch(e){H.value=e instanceof Error?e.message:`Base64 内容无效，无法还原文件。`}finally{P.value=!1}},pe=()=>{u.value=I.value=R.value=``,L.value=0,U.value=!1},me=()=>{Q(F.value),F.value=B.value=V.value=``,z.value=0,N.value=!1,M.value&&(M.value.value=``)};return n(()=>Q(F.value)),(n,l)=>(t(),a(`section`,g,[l[16]||=i(`header`,null,[i(`div`,null,[i(`small`,null,`LOCAL FILE BASE64 TOOL`),i(`h2`,null,`文件 Base64 编解码`),i(`p`,null,`所有操作均在浏览器本地完成，文件不会上传服务器。`)]),i(`span`,null,`图片 · 文档 · 压缩包 · 音视频`)],-1),i(`nav`,_,[i(`button`,{type:`button`,role:`tab`,"aria-selected":W.value===`encode`,class:s({active:W.value===`encode`}),onClick:l[0]||=e=>{W.value=`encode`,H.value=``}},`文件转 Base64`,10,v),i(`button`,{type:`button`,role:`tab`,"aria-selected":W.value===`decode`,class:s({active:W.value===`decode`}),onClick:l[1]||=e=>{W.value=`decode`,H.value=``}},`Base64 转文件`,10,y)]),i(`div`,b,[o(i(`article`,x,[l[12]||=i(`h3`,null,`文件转 Base64`,-1),i(`fieldset`,S,[l[10]||=i(`legend`,null,`输出格式`,-1),i(`label`,{class:s({selected:G.value===`data-url`})},[o(i(`input`,{"onUpdate:modelValue":l[2]||=e=>G.value=e,type:`radio`,value:`data-url`},null,512),[[c,G.value]]),l[8]||=e(`完整 Data URL`,-1)],2),i(`label`,{class:s({selected:G.value===`base64`})},[o(i(`input`,{"onUpdate:modelValue":l[3]||=e=>G.value=e,type:`radio`,value:`base64`},null,512),[[c,G.value]]),l[9]||=e(`纯 Base64 字符串`,-1)],2)]),i(`p`,C,r(G.value===`data-url`?`包含 MIME 类型和原文件名，解码时可更准确地还原文件。`:`仅输出 Base64 正文，不含文件信息，解码时将根据文件头自动识别。`),1),i(`label`,{class:`drop`,onDragover:l[5]||=h(()=>{},[`prevent`]),onDrop:l[6]||=h(e=>$(e.dataTransfer?.files[0]),[`prevent`])},[i(`input`,{type:`file`,onChange:l[4]||=e=>$(e.target.files?.[0])},null,32),i(`b`,null,r(I.value||`选择或拖拽文件`),1),l[11]||=i(`small`,null,`支持图片、PDF、OFD、Word、Excel、ZIP、TXT 等各类文件`,-1)],32),u.value?(t(),a(`textarea`,{key:0,value:Y.value,readonly:``,"aria-label":`Base64 编码结果`},null,8,w)):p(`v-if`,!0),u.value?(t(),a(`p`,T,r(R.value)+` · 原文件 `+r(Z(L.value))+` · 输出 `+r(Z(ce.value)),1)):p(`v-if`,!0),i(`div`,E,[i(`button`,{class:`primary`,disabled:!u.value,onClick:ue},r(U.value?`已复制`:`复制 Base64`),9,ee),i(`button`,{onClick:pe},`清空`)])],512),[[f,W.value===`encode`]]),o(i(`article`,te,[l[14]||=i(`h3`,null,`Base64 转文件`,-1),l[15]||=i(`p`,{class:`format-rule`},`自动识别完整 Data URL 或纯 Base64，支持图片、PDF、OFD、Office 文档、压缩包、文本及常见音视频格式。`,-1),i(`textarea`,{ref_key:`decodeInput`,ref:M,placeholder:`粘贴 Data URL 或纯 Base64 内容…`,"aria-label":`待解码 Base64 内容`,spellcheck:`false`,autocomplete:`off`,autocapitalize:`off`,onInput:l[7]||=e=>N.value=!!e.target.value},null,544),i(`div`,ne,[i(`button`,{class:`primary`,disabled:!N.value||P.value,onClick:fe},r(P.value?`正在解码…`:`解码文件`),9,re),i(`button`,{disabled:P.value,onClick:me},`清空`,8,D)]),F.value&&le.value?(t(),a(`img`,{key:0,src:F.value,alt:`解码图片预览`},null,8,O)):F.value?(t(),a(`div`,ie,[l[13]||=i(`span`,null,`FILE`,-1),i(`div`,null,[i(`b`,null,r(X.value),1),i(`small`,null,r(B.value),1)])])):p(`v-if`,!0),F.value?(t(),a(`p`,k,r(B.value)+` · `+r(Z(z.value)),1)):p(`v-if`,!0),F.value?(t(),a(`a`,{key:3,href:F.value,download:X.value},`下载文件`,8,A)):p(`v-if`,!0)],512),[[f,W.value===`decode`]])]),H.value?(t(),a(`p`,j,r(H.value),1)):p(`v-if`,!0)]))}}),[[`__scopeId`,`data-v-a9ca0573`]]);export{M as default};