/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
(function(){function t(n,t){var o=t.feed;this.caseSensitive=t.caseSensitive;this.marker=t.hasOwnProperty("marker")?t.marker:i;this.minChars=t.minChars!==null&&t.minChars!==undefined?t.minChars:r;this.pattern=t.pattern||u(this.marker,this.minChars);this.cache=t.cache!==undefined?t.cache:!0;this.throttle=t.throttle!==undefined?t.throttle:200;this._autocomplete=new CKEDITOR.plugins.autocomplete(n,{textTestCallback:f(this.marker,this.minChars,this.pattern),dataCallback:e(o,this),itemTemplate:t.itemTemplate,outputTemplate:t.outputTemplate,throttle:this.throttle,itemsLimit:t.itemsLimit})}function u(n,t){var i="\\"+n+"[_a-zA-Z0-9À-ž]";return i+=t?"{"+t+",}":"*",i+="$",new RegExp(i)}function f(n,t,i){function r(n,t){var r=n.slice(0,t).match(i),u;return r?(u=n[r.index-1],u!==undefined&&!u.match(/\s+/))?null:{start:r.index,end:t}:null}return function(n){return n.collapsed?CKEDITOR.plugins.textMatch.match(n,r):null}}function e(t,i){return function(r,u){function o(){var n=s(t).filter(function(n){var t=n.name;return i.caseSensitive||(t=t.toLowerCase(),f=f.toLowerCase()),t.indexOf(f)===0});e(n)}function s(n){var t=1;return CKEDITOR.tools.array.reduce(n,function(n,i){return n.push({name:i,id:t++}),n},[])}function h(){var r=new CKEDITOR.template(t).output({encodedQuery:encodeURIComponent(f)});if(i.cache&&n[r])return e(n[r]);CKEDITOR.ajax.load(r,function(t){var u=JSON.parse(t);i.cache&&u!==null&&(n[r]=u);e(u)})}function e(n){if(n){var t=CKEDITOR.tools.array.map(n,function(n){var t=i.marker+n.name;return CKEDITOR.tools.object.merge(n,{name:t})});u(t)}}var f=r.query;i.marker&&(f=f.substring(i.marker.length));CKEDITOR.tools.array.isArray(t)?o():typeof t=="string"?h():t({query:f,marker:i.marker},e)}}CKEDITOR._.mentions={cache:{}};var i="@",r=2,n=CKEDITOR._.mentions.cache;CKEDITOR.plugins.add("mentions",{requires:"autocomplete,textmatch,ajax",instances:[],init:function(n){var i=this;n.on("instanceReady",function(){CKEDITOR.tools.array.forEach(n.config.mentions||[],function(r){i.instances.push(new t(n,r))})})},isSupportedEnvironment:function(n){return n.plugins.autocomplete.isSupportedEnvironment(n)}});t.prototype={destroy:function(){this._autocomplete.destroy()}};CKEDITOR.plugins.mentions=t})()