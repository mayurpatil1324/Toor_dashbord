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
  EyeOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import {} from "react-router-dom";
import utils from "utils";
import masterService from "../../../../../services/MasterService";
import SettingService from "../../../../../services/SettingService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddNewCardForm = ({
  mode,
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  statusShow,
  roleList,
  initialVal,
  inputChange,
  inputChangeParent,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  //console.log(initialVal.id)

  form.setFieldsValue({
    name: initialVal.name,
    role_id: initialVal.role_id,
    email: initialVal.email,
    mobile: initialVal.mobile,
    password: initialVal.password,
    location: initialVal.location,
    prefix: initialVal.prefix,
    statusName: statusShow,
  });
  const showPrefix = (e) => {
    let value = e.target.value;
    form.setFieldsValue({
      prefix: value.substring(0, 3).toUpperCase(),
    });
    let value23 = value.substring(0, 3).toUpperCase();
    inputChangeParent(value, value23);
    //setInitialVal({ ...initialVal, 'location': value })
  };

  return (
    <Modal
      destroyOnClose={true}
      title={`${mode} User`}
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
          location: initialVal.location,
          prefix: initialVal.prefix,
          statusName: statusShow,
        }}
      >
        <Form.Item
          label="Role"
          name="role_id"
          rules={[
            {
              required: true,
              message: "Please enter role!",
            },
          ]}
        >
          <Select onChange={inputChange("role_id")} placeholder="Select Role">
            {roleList &&
              roleList.map((roleList, index) => {
                return (
                  <Option key={`roleList${index}`} value={roleList.id}>
                    {roleList.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
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
        {initialVal.role_id == 3 && (
          <>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please enter location!",
                },
              ]}
            >
              <Input
                placeholder="Please enter location"
                onChange={showPrefix}
              />
            </Form.Item>

            <Form.Item
              label="Location Code"
              name="prefix"
              rules={[
                {
                  required: true,
                  message: "Please enter location code!",
                },
              ]}
            >
              <Input
                placeholder="Please enter location code"
                onChange={inputChange("prefix")}
              />
            </Form.Item>
          </>
        )}
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
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    name: "",
    role_id: null,
    email: "",
    mobile: "",
    password: "",
    location: "",
    prefix: "",
  });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [roleList, setRole] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [mode, setMode] = useState("Add");
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(3);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
    addEmp: 0,
    emp: 0,
    partner: 0,
  });
  const auth_details = JSON.parse(
    useSelector((state) => state.auth.auth_details)
  );

  const listData = (roleId) => {
    const reqeustParam = { role_id: roleId };
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
    const reqeustParam = { is_active: 1, type: "role" };
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
    listData(roleId);
    listRole();

    const addPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 75
    );
    const editPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 76
    );
    const delPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 77
    );
    const addEmpPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 80
    );
    const empPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 78
    );
    const partnerPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 79
    );
    setBtnShowHide({
      add: addPermission.length,
      edit: editPermission.length,
      delete: delPermission.length,
      addEmp: addEmpPermission.length,
      emp: empPermission.length,
      partner: partnerPermission.length,
    });
  }, []);

  const tableColumns = [
    {
      title: "UserId",
      dataIndex: "agent_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "agent_id"),
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
      title: "Role",
      dataIndex: "role_name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "role_name"),
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
          {roleId == 3 ? (
            <>
              {btnShowHide.addEmp > 0 && (
                <Tooltip title="Add Employee">
                  <Button
                    className="mr-2 bg-warning"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                      addEmployee(elm.id);
                    }}
                    size="small"
                  />
                </Tooltip>
              )}
              <Tooltip title="View Details">
                <Button
                  type="primary"
                  className="mr-2 bg-success"
                  icon={<EyeOutlined />}
                  onClick={() => {
                    viewEmployee(elm.id);
                  }}
                  size="small"
                />
              </Tooltip>
            </>
          ) : (
            ""
          )}
          {btnShowHide.edit > 0 && (
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
          )}
          {btnShowHide.delete > 0 && (
            <Tooltip title="Delete">
              <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteCourse(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          )}
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

  const addEmployee = (id) => {
    let parent_id = id;
    navigate(`/dashboards/users/employee/${parent_id}`);
  };

  const viewEmployee = (id) => {
    let parent_id = id;
    navigate(`/dashboards/users/details/${parent_id}`);
  };

  const showModal = () => {
    setModalVisible(true);
    setMode("Add");
  };

  const closeModal = () => {
    setInitialVal({
      id: "",
      name: "",
      role_id: "",
      email: "",
      mobile: "",
      password: "",
      location: "",
      prefix: "",
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addUser = (values) => {
    //console.log(values)
    let statustype = values.statusName === true ? 1 : 0;

    //console.log(initialVal);
    if (initialVal.id > 0) {
      const user_type = values.role_id == 3 ? "partner" : "employee";
      const reqeustParam = {
        user_type: user_type,
        user_id: initialVal.id,
        role_id: values.role_id,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        is_active: statustype,
        location: values.location,
        prefix: values.prefix,
      };
      //console.log(reqeustParam)
      const resp = SettingService.updateUser(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData(roleId);
          }
          notification.success({ message: res.message });
          setInitialVal({
            id: "",
            name: "",
            role_id: "",
            email: "",
            mobile: "",
            password: "",
            location: "",
            prefix: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      //console.log(values)
      const user_type = values.role_id == 3 ? "partner" : "employee";
      const reqeustParam = {
        user_type: user_type,
        role_id: values.role_id,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        is_active: statustype,
        location: values.location,
        prefix: values.prefix,
      };
      const resp = SettingService.AddUser(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            //setList([...list, res.data])
            listData(roleId);
          }

          notification.success({ message: res.message });
          setInitialVal({
            id: "",
            name: "",
            role_id: "",
            email: "",
            mobile: "",
            password: "",
            location: "",
            prefix: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {
          //console.log(err)
        });
    }
  };
  const showEditVaue = (elm) => {
    //console.log(elm)

    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({
      id: elm.id,
      name: elm.name,
      role_id: elm.role_id,
      email: elm.email,
      mobile: elm.mobile,
      password: "",
      location: elm.location,
      prefix: elm.prefix,
    });
    setStatusShow(statustype);
    showModal();
    setMode("Edit");
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
          listData(roleId);
          notification.success({ message: res.message });
        }
      })
      .catch((err) => {});
  };
  const inputChange = (name) => (e) => {
    let value;
    if (name === "role_id") {
      value = e;
    } else {
      value = e.target.value;
    }

    setInitialVal({ ...initialVal, [name]: value });
  };
  const inputChangeParent = (val1, val2) => {
    //console.log(one,two)
    setInitialVal({ ...initialVal, location: val1, prefix: val2 });
  };

  const SearchRole = (id) => {
    setRoleId(id);
    listData(id);
  };
  var i = 1;
  return (
    <Card
      title={`${roleId == 3 ? "Partners" : "Get Employee"} list`}
      icon={<SearchOutlined />}
    >
      <Row gutter={16} className="justify-content-between mb-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          {btnShowHide.emp > 0 && (
            <Button
              className="bg-success"
              onClick={() => SearchRole()}
              type="primary"
              icon={<SearchOutlined />}
            >
              Get Employee
            </Button>
          )}
          {btnShowHide.partner > 0 && (
            <Button
              className="mx-2 mb-1 bg-warning"
              onClick={() => SearchRole(3)}
              type="primary"
              icon={<SearchOutlined />}
              style={{ width: "130px" }}
            >
              Partner
            </Button>
          )}
          {btnShowHide.add > 0 && (
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
              style={{ width: "140px" }}
            >
              Add User
            </Button>
          )}
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </Col>
      </Row>
      <AddNewCardForm
        mode={mode}
        visible={modalVisible}
        onCreate={addUser}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        roleList={roleList}
        initialVal={initialVal}
        inputChange={inputChange}
        inputChangeParent={inputChangeParent}
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
