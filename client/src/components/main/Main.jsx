import { useEffect, useState } from 'react';
import classes from './Main.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUploads } from '../../store/actions/upload';
import { logout } from '../../store/actions/auth';
import { Layout, List, Pagination } from 'antd';
import { UserOutlined, DownloadOutlined, LogoutOutlined } from '@ant-design/icons';
import Uploader from "../uploader/Uploader";
const { Header } = Layout;

const Main = () => {
    const [page, setPage] = useState(1);
    const userData = useSelector(state => state.auth.userData);
    const userUploads = useSelector(state => state.upload.userUploads);
    const total = useSelector(state => state.upload.total);
    const uploaded = useSelector(state => state.upload.uploaded);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserUploads(page));
    }, [page, uploaded])

    const downloadFile = elem => {
        if (elem.file) {
          const a = document.createElement("a");
          a.href = "data:application/pdf;base64," + elem.file;
          a.download = elem.fileName;
          a.click();
        }
    }

    const logo = 'https://sentmed.s3.eu-west-1.amazonaws.com/media/2020/10/29091821/sc-web-dark1-2.png';

    return <div className={classes.background}>
        <Header className={classes.header}>
            <img src={logo} alt="logo" />
            <span className={classes.logoutIcon} onClick={() => dispatch(logout())}><LogoutOutlined /></span>
            <div><UserOutlined /> {userData.name} {userData.surname}</div>
        </Header>
        <div className={classes.dragger}>
           <Uploader />
        </div>
        <Pagination current={page} className={classes.pagination} onChange={page => setPage(page)} total={total} />
        <List className={classes.list} dataSource={userUploads}
            renderItem={item => <List.Item className={classes.listItem}>{item.fileName}
                                    <DownloadOutlined onClick={() => downloadFile(item)} className={classes.downloadIcon} />
                                </List.Item>}>
        </List>
        
    </div>
}

export default Main;