import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Input,
  Tag,
  Form,
  Switch,
  notification,
  message,
} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import SettingService from '../../../../services/SettingService';
const ListPermission = (props) => {
  const [list, setList] = useState([]);
  const [permissionList, setListAll] = useState([]);

  const listPermissionList = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getPermission(reqeustParam);
      resp
        .then((res) => {
          setList(res.data.permissions);
          setListAll(res.data.permissions);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listPermissionList();
  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => utils.antdTableSorter(a, b, "title"),
    },
    {
      title: "Parent Name",
      dataIndex: "parent_name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "parent_name"),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => <div className="text-left">
        <div className="ml-3">
                           <Switch
                              checked={elm.is_active == 1 ? true : false}
                              onClick={() => { onUpdate(elm.id) }} 
                            />
                        </div>
      </div>,
    },
  ];

  const onUpdate = (id) => {
    const data = {permission_id: id };
    const resp = SettingService.updatePermission(data);
    resp
      .then((res) => {
        listPermissionList();
      })
      .catch((err) => {
        notification.error({
          message: err.message,
        });
      });
  }
  const onSearch = (e) => {
    //console.log(e.currentTarget.value);
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? permissionList : permissionList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };
  var i = 1;
  return (
    <Card>
      <Flex
        className="mb-4"
        alignItems="center"
        justifyContent="space-between"
        mobileFlex={false}
      >
        <Flex className="mb-1" mobileFlex={false}>
          <div className="">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
      </Flex>
      <div className="table-responsive">
        <Table key={i++} columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default ListPermission;
