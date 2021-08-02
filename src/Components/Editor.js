import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div>
      ciao
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
