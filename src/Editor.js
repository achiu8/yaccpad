import React, { Component } from 'react';
import debounce from './debounce';
import {
  Editor as DraftEditor,
  EditorState,
  ContentState,
  convertFromRaw
} from 'draft-js';
import Code from 'draft-js-code';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs'

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

    this.state = {
      editor: EditorState.createWithContent(contentWithCodeBlock(''), DECORATOR),
      socket: new WebSocket(`${window.location.protocol.replace('http', 'ws')}//${window.location.host}/connect`)
    };
  }

  componentDidMount() {
    this.state.socket.onmessage = this.handleReceive;
  }

  sendContent = debounce(() => {
    this.state.socket.send(this.state.editor.getCurrentContent().getPlainText());
  });

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
