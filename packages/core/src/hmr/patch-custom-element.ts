/**
 * Based on: https://github.com/Polymer/lit-element/pull/802
 */
const implMap = new Map();

function isHotReloadableElementClass(maybe: CustomElementConstructor) {
  return 'hotReplaceCallback' in maybe;
}

const originalDefine = customElements.define;

function hotDefine(tagname: string, classObj: CustomElementConstructor) {
  if (!('hotReplaceCallback' in classObj)) {
    return originalDefine.call(customElements, tagname, classObj);
  }
  const impl = implMap.get(tagname);

  if (!impl) {
    implMap.set(tagname, classObj);
    originalDefine.call(customElements, tagname, classObj);
  } else {
    impl.hotReplaceCallback(classObj);
  }
}

customElements.define = hotDefine;
