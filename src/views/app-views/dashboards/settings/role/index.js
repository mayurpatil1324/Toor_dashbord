import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Tooltip,
  Tag,
  Modal,
  Form,
  Switch,
  notification,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";
import utils from "utils";
//import { getCourseType } from '../../../../services/MasterService';
import masterService from "../../../../../services/MasterService";
import { useSelector } from "react-redux";

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  statusShow,
  initialVal,
  inputChange,
}) => {
  const [form] = Form.useForm();
  //console.log(initialVal)
  form.setFieldsValue({
    name: initialVal.name,
    statusName: statusShow,
  });
  return (
    <Modal
      destroyOnClose={true}
      title="Add New Role"
      open={visible}
      okText="Submit"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        preserve={false}
        form={form}
        name="addRole"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          statusName: statusShow,
        }}
      >
        <Form.Item
          label="Role Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter GET status name!",
            },
          ]}
        >
          <Input placeholder="Role Name" onChange={inputChange("name")} />
        </Form.Item>
        <Form.Item label="Status" name="statusName">
          <Switch onChange={statusOnChange} checked={statusShow} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Role Name"
      open={visible}
      okText="OK"
      onCancel={onCancelConfirm}
      onOk={() => {
        onOKConfirm();
      }}
    >
      Are you sure want to delete this item?
    </Modal>
  );
};

const RoleList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", name: "" });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({ add: 0, edit: 0, delete: 0, permission: 0 });
  const auth_details = JSON.parse(useSelector(state => state.auth.auth_details))

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getRole(reqeustParam);
      resp
        .then((res) => {
          setList(res.data);
          setListAll(res.data);
        })
        .catch((err) => { });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
    const addPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 68)
    const editPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 69)
    const delPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 70)
    const permissionPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 71)
    setBtnShowHide({ add: addPermission.length, edit: editPermission.length, delete: delPermission.length, permission: permissionPermission.length })
  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Role Name",
      dataIndex: "name",

      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (status) => (
        <Tag className="text-capitalize" color={status === 1 ? "cyan" : "red"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "is_active"),
    },

    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex className="text-left">
          {btnShowHide.permission > 0 &&
            <Tooltip title="Permission">
              <Button
                type="primary"
                className="mr-2"
                icon={<KeyOutlined />}
                onClick={() => {
                  addPermission(elm);
                }}
                size="small"
              />
            </Tooltip>
          }
          {btnShowHide.edit > 0 &&
            <Tooltip title="Edit">
              <Button
                type="primary"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  showEditVaue(elm);
                }}
                size="small"
              />
            </Tooltip>
          }
          {btnShowHide.delete > 0 &&
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteCourse(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          }
        </Flex>
      ),
    },
  ];

  const addPermission = (elm) => {
    let role_id = elm.id;
    navigate(`/dashboards/roles/permission/${role_id}`);
  };

  const onSearch = (e) => {
    //console.log(e.currentTarget.value);
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? listAll : listAll;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setInitialVal({ id: "", name: "" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addRole = (values) => {
    //console.log(values)
    let statustype = values.statusName === true ? 1 : 0;

    //console.log(initialVal);
    if (initialVal.id > 0) {
      const reqeustParam = {
        role_id: initialVal.id,
        name: values.name,
        is_active: statustype,
      };
      const resp = masterService.editRole(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({ message: "Role updated successfully." });
          setInitialVal({ id: "", name: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => { });
    } else {
      const reqeustParam = { name: values.name, is_active: statustype };
      const resp = masterService.addRole(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Role added successfully." });
          setInitialVal({ id: "", name: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => { });
    }

  };
  const showEditVaue = (elm) => {
    //console.log(elm)

    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name });
    setStatusShow(statustype);
    showModal();
  };
  const deleteCourse = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { role_id: initialId };
    //console.log(initialId)
    const resp = masterService.deleteRole(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({ message: "Role deleted successfully." });
        }
      })
      .catch((err) => { });
  };
  const inputChange = (name) => (e) => {
    let value;
    name === "name" ? (value = e.target.value) : (value = e);

    setInitialVal({ ...initialVal, [name]: value });
  };

  var i = 1;
  return (
    <Card>
      <Row gutter={16} className="justify-content-between my-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          {btnShowHide.add > 0 &&
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Role
            </Button>
          }
        </Col>
        <Col xs={24} sm={24} md={6}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        onCreate={addRole}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        initialVal={initialVal}
        inputChange={inputChange}
      />
      <ConfirmationBox
        id={initialId}
        visible={modalVisibleConfirmation}
        onOKConfirm={onOKConfirm}
        onCancelConfirm={onCancelConfirm}
      />

      <div className="table-responsive">
        <Table key={i++} columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default RoleList;
