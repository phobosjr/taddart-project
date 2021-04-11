import React from 'react';
import PropTypes from 'prop-types';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const configuration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      'alignment',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'imageInsert',
      'fontColor',
      'fontSize',
      'code'
    ]
  },
  language: 'fr',
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  licenseKey: '',
};

const Editor = ({onChange, name, value}) => {
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        config={configuration}
        data={value}
        onReady={editor => editor.setData(value)}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({target: {name, value: data}});
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;