(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{192:function(t,e,n){},196:function(t,e,n){},198:function(t,e,n){"use strict";n.r(e);var o=n(3),a=n.n(o),c=n(16),r=n.n(c),i=(n(83),n(27)),u=n(28),s=n(30),l=n(29),d=n(31),h=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return function(){for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];clearTimeout(e),e=setTimeout(function(){return t.apply(void 0,a)},n)}},f=n(11),m=n(45),p=n.n(m),v=n(76),w=n.n(v),b=n(77),E=n.n(b),k=(n(191),n(192),n(194),new w.a({prism:E.a,defaultSyntax:"python"})),g=function(t){return Object(f.convertFromRaw)({entityMap:{},blocks:[{type:"code-block",text:t}]})},j=function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(s.a)(this,Object(l.a)(e).call(this))).sendContent=h(function(){t.socket.send(t.state.editor.getCurrentContent().getPlainText())}),t.handleReceive=function(e){var n=e.data;t.setState({editor:f.EditorState.moveFocusToEnd(f.EditorState.push(t.state.editor,g(n)))})},t.handleChange=function(e){t.setState({editor:e},t.sendContent)},t.handleTab=function(e){var n=t.state.editor;return!!p.a.hasSelectionInBlock(n)&&(t.handleChange(p.a.onTab(e,n)),!0)},t.socket=new WebSocket("".concat(window.location.protocol.replace("http","ws"),"//").concat(window.location.host,"/connect")),t.state={editor:f.EditorState.createWithContent(g(""),k)},t}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){this.socket.onmessage=this.handleReceive}},{key:"render",value:function(){return a.a.createElement("div",{className:"section editor"},a.a.createElement(f.Editor,{editorState:this.state.editor,onChange:this.handleChange,onTab:this.handleTab}))}}]),e}(o.Component),C=(n(196),function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(s.a)(this,Object(l.a)(e).call(this))).handleExecute=function(){fetch("/execute").then(function(t){return t.json()}).then(function(e){var n=e.output;return t.setState({output:n})}).catch(function(){return t.setState({output:"There was an error"})})},t.state={output:""},t}return Object(d.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"header"},a.a.createElement("button",{onClick:this.handleExecute},"Execute")),a.a.createElement(j,null),a.a.createElement("div",{className:"section output"},this.state.output))}}]),e}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},78:function(t,e,n){t.exports=n(198)},83:function(t,e,n){}},[[78,2,1]]]);
//# sourceMappingURL=main.815cd2b9.chunk.js.map