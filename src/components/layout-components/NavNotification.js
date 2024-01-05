import React, { useEffect, useState } from "react";
import { Badge, Avatar, List, Button, Popover } from "antd";
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import notificationData from "assets/data/notification.data.json";
import Flex from "components/shared-components/Flex";
import SettingService from "services/SettingService";
import { Link, useNavigate } from "react-router-dom";

const getIcon = (icon) => {
  switch (icon) {
    case "mail":
      return <MailOutlined />;
    case "alert":
      return <WarningOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

const getNotificationBody = (list, showRedirect) => {
	
	
	return list.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="list-clickable px-0 py-2">
          <Flex alignItems="center">
            <div className="pr-3">
              {/* {item.img ? (
                <Avatar src={`/img/avatars/${item.img}`} />
              ) : (
                <Avatar
                  className={`ant-avatar-${item.type}`}
                  icon={getIcon(item.icon)}
                />
              )} */}
			  {/* <Avatar
                  className="ant-avatar-info"
                  icon={<MailOutlined />}
                /> */}
            </div>
            <div className="mr-3">
              {/* <span className="font-weight-bold text-dark">{item.name} </span> */}
              <a onClick={() => showRedirect(item)}><span className="text-gray-light font-weight-bold text-dark">{item.message}</span></a>
            </div>
            {/* <small className="ml-auto">{item.created_at}</small> */}
          </Flex>
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="empty"
      />
      <p className="mt-3">You have viewed all notifications</p>
    </div>
  );
};

export const NavNotification = ({ mode }) => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [showTotal, setShowTotal] = useState("")
const navigate = useNavigate()
  const listData = (page, pageSize) => {
    const reqeustParam = { page: page, pageSize: pageSize };
    try {
      const resp = SettingService.notification(reqeustParam);
      resp
        .then((res) => {
			setShowTotal(res.data.total)
			setData(res.data.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
  }, []);

  const handleVisibleChange = () => {
	showPopup === true ? setShowPopup(false) : setShowPopup(true);

}
const showComment = () => {
	setShowPopup(false)
	navigate("/dashboards/comment");
}
const showRedirect = (values) => {
	if(values.type == 'APPLICATION' || values.type == 'APPLICATION_STATUS'){
		navigate(`/dashboards/application-detail/${values.type_id}`, { state: { defalutApp: 1 } });
	} else if(values.type == 'LEADS') {
		navigate(`/dashboards/student-detail/${values.type_id}`, { state: { defalutApp: 1 } });
	}
	setShowPopup(false)
}


  const notificationList = (
    <div style={{ maxWidth: 300 }}>
      <div className="border-bottom d-flex justify-content-between align-items-center px-3 py-2">
        <h4 className="mb-0">Notification</h4>
        { /* <Button
          className="text-primary"
          type="text"
          onClick={() => setData([])}
          size="small"
        >
          Clear{" "}
        </Button>
  */ }
      </div>
      <div className="nav-notification-body">{getNotificationBody(data,showRedirect)}</div>
      {data.length > 0 ? (
        <div className="px-3 py-2 border-top text-center">
          <a className="d-block" onClick={showComment}>
            View all
          </a>
        </div>
      ) : null}
    </div>
  );



  return (
    <Popover
      placement="bottomRight"
      title={null}
      content={notificationList}
      trigger="click"
      overlayClassName="nav-notification"
      overlayInnerStyle={{ padding: 0 }}
	  open={showPopup}
	  onOpenChange={handleVisibleChange}
    >
      <NavItem mode={mode}>
        <Badge count={showTotal}>
          <BellOutlined className="nav-icon mx-auto" type="bell" />
        </Badge>
      </NavItem>
    </Popover>
  );
};

export default NavNotification;
