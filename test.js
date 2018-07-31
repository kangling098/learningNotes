beforeUpload(file, fileList) {
    console.log(file, fileList);
    return new Promise((resolve,reject) => {
        if(this.props.queryObj.labelIds == ''){
            MessageChannel.warning('请先使用标签')
            reject()
        }
        // 下面两个类似
        confirm({
            onOk(){
                resolve(file);
            },
            onCancel(){
                reject()
            }
        })
        
    });
  }