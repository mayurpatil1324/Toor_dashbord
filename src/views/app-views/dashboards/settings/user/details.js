import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Switch, notification } from "antd";
import { useParams } from "react-router-dom";
import SettingService from "../../../../../services/SettingService";

const UserDetails = (props) => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);

  const userData = () => {
    const reqeustParam = { user_id: userId };
    try {
      const resp = SettingService.getDetails(reqeustParam);
      resp
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  }

  useEffect(() => {
    userData();
  }, []);


  return (
    <>
      <Form
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <div className="container123">
          <Card title={`${user?.name} Details`}>

          </Card>
        </div>
      </Form>
    </>
  );
};

export default UserDetails;
