import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { config, request } from 'utils'
import "simplemde/dist/simplemde.min.css"

export default class MarkDown extends React.Component {
  
  state = {}
  
  onChange = e => {
    const fileBtn = this.refs.getFile
    const file = fileBtn.files[0]
    const formData = new FormData()
    formData.append('file',file)
    
    const that = this

    request({
      url: `${config.APIV1}/upload?type=imge`,
      method: 'post',
      data: {isFormData: formData},
    }).then(res => {
      const { editor } = this.state

      if(res && res.success) {
        editor.drawImage('https://www.baidu.com/img/xinshouye_77c426fce3f7fd448db185a7975efae5.png')
      }
    })
  }
  render() {
    const that = this
    return (
      <div>
        <SimpleMDE
          options={{
            toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "link", "image", "table", {
              name: "horizontal-rule",
              action: function customFunction(editor){
                that.setState({
                  editor,
                })
                const fileBtn = that.refs.getFile
                fileBtn.click()
              },
              className: "fa fa-star",
            }, "|", "preview", "fullscreen"],
            toolbarTips: false,
            status: false,
            // autoDownloadFontAwesome: false,
            initialValue: this.props.initialValue,
          }}
          onChange={this.props.handleChange}
        />
        <input type="file" ref="getFile" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={this.onChange} style={{display: 'none'}} />
      </div>
    )
  }
}
