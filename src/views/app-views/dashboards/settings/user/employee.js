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
  Select,
  notification,
  message,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import utils from "utils";
import masterService from "../../../../../services/MasterService";
import SettingService from "../../../../../services/SettingService";
import { useNavigate } from "react-router-dom";

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  statusShow,
  roleList,
  initialVal,
  inputChange,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  //console.log(initialVal)
  form.setFieldsValue({
    name: initialVal.name,
    statusName: statusShow,
  });
  return (
    <Modal
      destroyOnClose={true}
      title="Add New Employee"
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
        className="mt-3"
        preserve={false}
        form={form}
        name="addGETStatus"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          role_id: initialVal.role_id,
          name: initialVal.name,
          email: initialVal.email,
          mobile: initialVal.mobile,
          password: initialVal.password,
          statusName: statusShow,
        }}
      >
        {/* <Form.Item label="Role" name="role_id">
          <Select
            showSearch
            placeholder="Select Role"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            onChange={inputChange("role_id")}
          >
            {roleList &&
              roleList.map((roleList, index) => {
                return (
                  <Option key={`role${index}`} value={roleList.id}>
                    {roleList.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item> */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter name!",
            },
          ]}
        >
          <Input placeholder="Name" onChange={inputChange("name")} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email!",
            },
          ]}
        >
          <Input
            placeholder="Please enter mail"
            onChange={inputChange("email")}
          />
        </Form.Item>
        <Form.Item label="Mobile" name="mobile">
          <Input
            placeholder="Please enter mobile"
            onChange={inputChange("mobile")}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: initialVal.id > 0 ? false : true,
              message: "Please enter password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Please enter password"
            onChange={inputChange("password")}
          />
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
      title="Name"
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

const UserList = () => {
  const { parent_id } = useParams();
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    name: "",
    role_id: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [roleList, setRole] = useState([]);
  const [listAll, setListAll] = useState([]);
  const navigate = useNavigate();
  const listData = () => {
    const reqeustParam = { parent_id: parent_id };
    try {
      const resp = SettingService.getUser(reqeustParam);
      resp
        .then((res) => {
          setList(res.data);
          setListAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  const listRole = () => {
    const reqeustParam = { is_active: 1, type: "addUser" };
    try {
      const resp = masterService.getRole(reqeustParam);
      resp
        .then((res) => {
          setRole(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
    listRole();
  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",

      sorter: (a, b) => utils.antdTableSorter(a, b, "mobile"),
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
        <Flex>
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
        </Flex>
      ),
    },
  ];

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
    setInitialVal({
      id: "",
      name: "",
      role_id: "",
      email: "",
      mobile: "",
      password: "",
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addUsers = (values) => {
    let statustype = values.statusName === true ? 1 : 0;
    const reqeustParam = {
      user_type: "employee",
      parent_id: parent_id,
      role_id: 5,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      is_active: statustype,
    };
    var resp = [];
    if (initialVal.id > 0) {
      reqeustParam.user_id = initialVal.id
      resp = SettingService.updateUser(reqeustParam);
    } else {
      resp = SettingService.AddUser(reqeustParam);
    }
    resp
      .then((res) => {
        if (res.status === 200) {
          listData();
          notification.success({ message: res.message });
          setInitialVal({
            id: "",
            name: "",
            email: "",
            mobile: "",
            password: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
  const showEditVaue = (elm) => {
    //console.log(elm)

    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({
      id: elm.id,
      role_id: 5,
      name: elm.name,
      email: elm.email,
      mobile: elm.mobile,
      password: "",
    });
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
    const reqeustParam = { user_id: initialId };
    const resp = SettingService.deleteUser(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({ message: res.message });
        }
      })
      .catch((err) => {});
  };


  const inputChange = (name) => (e) => {
    let value = e.target.value;
    setInitialVal({ ...initialVal, [name]: value });
  };

  console.log(initialVal);
  var i = 1;
  return (
    <Card title="Employee">
      <Row gutter={16} className="justify-content-between mb-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          <Button
            className="mr-1"
            onClick={showModal}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Add Employee
          </Button>
        </Col>
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        onCreate={addUsers}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        roleList={roleList}
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

export default UserList;
