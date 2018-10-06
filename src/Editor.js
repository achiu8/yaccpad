import React, { Component } from 'react';
import Code from 'draft-js-code';
import {
  Editor as DraftEditor,
  EditorState,
  ContentState,
  convertFromRaw
} from 'draft-js';
import debounce from './debounce';

import './Editor.css';

const WEB_SOCKET_URL = window.location.protocol.replace('http', 'ws') + '//' + window.location.host;

const contentWithCodeBlock = text => convertFromRaw({
  entityMap: {},
  blocks: [{ type: 'code-block', text }]
});

class Editor extends Component {
  constructor() {
    super();

    this.state = {
      editor: EditorState.createWithContent(contentWithCodeBlock('')),
      in: new WebSocket(WEB_SOCKET_URL + '/receive'),
      out: new WebSocket(WEB_SOCKET_URL + '/submit')
    };
  }

  componentDidMount() {
    this.state.in.onmessage = this.handleReceive;
  }

  sendContent = () => {
    this.state.out.send(this.state.editor.getCurrentContent().getPlainText());
  };

  sameContent = content => {
    return this.state.editor.getCurrentContent().getPlainText() === content;
  };

  handleReceive = ({ data }) => {
    if (!this.sameContent(data)) {
      this.setState({
        editor: EditorState.moveFocusToEnd(EditorState.push(
          this.state.editor,
          contentWithCodeBlock(data)
        ))
      });
    }
  };

  handleChange = editor => {
    this.setState({ editor }, debounce(this.sendContent));
  };

  handleTab = e => {
    const { editor } = this.state;

    if (!Code.hasSelectionInBlock(editor)) return false;

    this.handleChange(Code.onTab(e, editor));

    return true;
  };

  render() {
    return (
      <div className="editor">
        <DraftEditor
          editorState={this.state.editor}
          onChange={this.handleChange}
          onTab={this.handleTab}
        />
      </div>
    );
  }
}

export default Editor;
