import { useEffect, useState } from 'react';
import classes from "./Uploader.module.scss";
import { Upload, message, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, resetUploadFile } from '../../store/actions/upload';
const { Dragger } = Upload;

const Uploader = () => {
    const uploaded = useSelector(state => state.upload.uploaded);
    const [percent, setPercent] = useState(-1);

    useEffect(() => {
        if (uploaded) {
            setPercent(100);
            dispatch(resetUploadFile());
            setTimeout(() => {
                setPercent(-1);
            }, 500);
        }
    }, [uploaded]);

    const dispatch = useDispatch();
    const formData = new FormData();

    const props = {
        name: 'file',
        multiple: false,
        action: '',
        accept: 'application/pdf',
        showUploadList: false,
        customRequest: (data) => {
            setPercent(0)
            formData.set('file', data.file);
            dispatch(uploadFile(formData));
        },
        onChange(info) {
          const { status } = info.file;
          if (status === 'uploading') {
            setPercent(prevState => prevState + 10);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return <div className={classes.draggable}>
            <Dragger {...props}>
                <h1>Upload PDF File</h1>
            </Dragger>
            {percent >= 0 && <Progress
                strokeColor={'green'}
                percent={percent}
                />}
        </div>
}

export default Uploader;