import React, { Component } from 'react';
import debounce from './debounce';
import {
  Editor as DraftEditor,
  EditorState,
  convertFromRaw
} from 'draft-js';
import Code from 'draft-js-code';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs'
import WebSocket from 'reconnecting-websocket';

import './Editor.css';
import 'prismjs/themes/prism.css';

const DECORATOR = new PrismDecorator({
  prism: Prism,
  defaultSyntax: 'python'
});

const contentWithCodeBlock = text => convertFromRaw({
  entityMap: {},
  blocks: [{ type: 'code-block', text }]
});

class Editor extends Component {
  constructor() {
    super();

    this.socket = new WebSocket(`${window.location.protocol.replace('http', 'ws')}//${window.location.host}/connect`);

    this.state = {
      editor: EditorState.createWithContent(contentWithCodeBlock(''), DECORATOR),
    };
  }

  componentDidMount() {
    this.socket.onmessage = this.handleReceive;
  }

  sendContent = debounce(() => {
    this.socket.send(this.state.editor.getCurrentContent().getPlainText());
  });

  handleReceive = ({ data }) => {
    this.setState({
      editor: EditorState.moveFocusToEnd(EditorState.push(
        this.state.editor,
        contentWithCodeBlock(data)
      ))
    });
  };

  handleChange = editor => {
    this.setState({ editor }, this.sendContent);
  };

  handleTab = e => {
    const { editor } = this.state;

    if (!Code.hasSelectionInBlock(editor)) return false;

    this.handleChange(Code.onTab(e, editor));

    return true;
  };

  render() {
    return (
      <div className="section editor">
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
