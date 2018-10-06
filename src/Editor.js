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

const contentWithCodeBlock = text => convertFromRaw({
  entityMap: {},
  blocks: [{ type: 'code-block', text }]
});

class Editor extends Component {
  constructor() {
    super();

    this.state = {
      editor: EditorState.createWithContent(contentWithCodeBlock('')),
      socket: new WebSocket(`${window.location.protocol.replace('http', 'ws')}//${window.location.host}/connect`)
    };
  }

  componentDidMount() {
    this.state.socket.onmessage = this.handleReceive;
  }

  sendContent = () => {
    this.state.socket.send(this.state.editor.getCurrentContent().getPlainText());
  };

  sameContent = content => {
    return this.state.editor.getCurrentContent().getPlainText() === content;
  };

  handleReceive = ({ data }) => {
    this.setState({
      editor: EditorState.moveFocusToEnd(EditorState.push(
        this.state.editor,
        contentWithCodeBlock(data)
      ))
    });
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
