(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{186:function(t,e,n){},188:function(t,e,n){"use strict";n.r(e);var o=n(3),a=n.n(o),i=n(16),r=n.n(i),c=(n(81),n(27)),s=n(28),u=n(30),d=n(29),l=n(31),h=n(45),m=n.n(h),b=n(10),f=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;return function(){for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];clearTimeout(e),e=setTimeout(function(){return t.apply(void 0,a)},n)}},v=(n(186),window.location.protocol.replace("http","ws")+"//"+window.location.host),p=function(t){return Object(b.convertFromRaw)({entityMap:{},blocks:[{type:"code-block",text:t}]})},w=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(u.a)(this,Object(d.a)(e).call(this))).sendContent=function(){t.state.out.send(t.state.editor.getCurrentContent().getPlainText())},t.sameContent=function(e){return t.state.editor.getCurrentContent().getPlainText()===e},t.handleReceive=function(e){var n=e.data;t.sameContent(n)||t.setState({editor:b.EditorState.moveFocusToEnd(b.EditorState.push(t.state.editor,p(n)))})},t.handleChange=function(e){t.setState({editor:e},f(t.sendContent))},t.handleTab=function(e){var n=t.state.editor;return!!m.a.hasSelectionInBlock(n)&&(t.handleChange(m.a.onTab(e,n)),!0)},t.state={editor:b.EditorState.createWithContent(p("")),in:new WebSocket(v+"/receive"),out:new WebSocket(v+"/submit")},t}return Object(l.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.state.in.onmessage=this.handleReceive}},{key:"render",value:function(){return a.a.createElement("div",{className:"editor"},a.a.createElement(b.Editor,{editorState:this.state.editor,onChange:this.handleChange,onTab:this.handleTab}))}}]),e}(o.Component),g=function(t){function e(){return Object(c.a)(this,e),Object(u.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(w,null))}}]),e}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},76:function(t,e,n){t.exports=n(188)},81:function(t,e,n){}},[[76,2,1]]]);
//# sourceMappingURL=main.7b1c3427.chunk.js.map