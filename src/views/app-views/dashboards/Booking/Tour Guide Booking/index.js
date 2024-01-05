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
  Select,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import masterService from "../../../../../services/MasterService";
import utils from "utils";
import { useSelector } from "react-redux";
import { Option } from "antd/es/mentions";

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  statusShow,
  initialVal,
  inputChange,
  listcityAll,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    id: initialVal.id,
    name: initialVal.name,
    email: initialVal.email,
    mobile: initialVal.mobile,
    gender: initialVal.gender,
    address: initialVal.address,
    description: initialVal.description,
    Availability: initialVal.Availability,
    city_id: initialVal.city_id,
    // statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit Tour Guide" : "Add New Tour Guide"}
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
        name="addGuide"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          email: initialVal.email,
          mobile: initialVal.mobile,
          gender: initialVal.gender,
          address: initialVal.address,
          description: initialVal.description,
          Availability: initialVal.Availability,
          city_id: initialVal.city_id,
          // statusName: statusShow,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Name!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            onChange={inputChange("name", initialVal.id)}
          />
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
            placeholder="Email"
            onChange={inputChange("email", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please enter mobile!",
            },
          ]}
        >
          <Input
            placeholder="Mobile"
            onChange={inputChange("mobile", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please enter gender!",
            },
          ]}
        >
          <Input
            placeholder="Gender"
            onChange={inputChange("gender", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter address!",
            },
          ]}
        >
          <Input
            placeholder="Address"
            onChange={inputChange("address", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description!",
            },
          ]}
        >
          <Input
            placeholder="Description"
            onChange={inputChange("description", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Availability"
          name="Availability"
          rules={[
            {
              required: true,
              message: "Please enter availability!",
            },
          ]}
        >
          <Input
            placeholder="Vailability"
            onChange={inputChange("Availability", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="city Name"
          name="city_id"
          rules={[
            {
              required: true,
              message: "Please select City Name!",
            },
          ]}
        >
          <Select
            onChange={inputChange("city_id")}
            showSearch
            placeholder="Select City Name"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {listcityAll &&
              listcityAll.map((listCType) => (
                <Option key={listCType.id} value={listCType.id}>
                  {listCType.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        {/* <Form.Item label=" Active" name="statusName">
          <Switch onChange={statusOnChange} checked={statusShow} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Tour Guide"
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

const Guidelist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    description: "",
    Availability: "",
    city_id: "",
  });
  const [listcityAll, setlistcityAll] = useState([]);
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
  });

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getGuide(reqeustParam);
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

  const listcityData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getCity(reqeustParam);
      resp
        .then((res) => {
          console.log(res);

          setlistcityAll(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
    listcityData();

    // Fetch data for listdepartmentAll
    setBtnShowHide({ add: 1, edit: 1, delete: 1 });
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
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => utils.antdTableSorter(a, b, "gender"),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => utils.antdTableSorter(a, b, "address"),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
    },
    {
      title: "Availability",
      dataIndex: "Availability",
      sorter: (a, b) => utils.antdTableSorter(a, b, "Availability"),
    },
    {
      title: "city",
      render: (_, elm) => <>{elm.city?.name}</>,
    },
    // {
    //   title: "Status",
    //   dataIndex: "is_active",
    //   render: (status) => (
    //     <Tag className="text-capitalize" color={status === 1 ? "cyan" : "red"}>
    //       {status === 1 ? "Active" : "Inactive"}
    //     </Tag>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "is_active"),
    // },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
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
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteGuide(elm.id);
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
      email: "",
      mobile: "",
      gender: "",
      address: "",
      description: "",
      Availability: "",
      city_id: "",
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditGuide = (values) => {
    let guidestatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        guide_id: initialVal.id,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        gender: values.gender,
        address: values.address,
        description: values.description,
        Availability: values.Availability,
        city_id: values.city_id,
        // is_active: guidestatus,
      };
      const resp = masterService.editGuide(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Tour Guide updated successfully.",
          });
          setInitialVal({
            guide_id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            address: "",
            description: "",
            Availability: "",
            city_id: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        gender: values.gender,
        address: values.address,
        description: values.description,
        Availability: values.Availability,
        city_id: values.city_id,
        // is_active: guidestatus,  
      };
      const resp = masterService.addGuide(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: " TourGuide added successfully." });
          setInitialVal({
            guide_id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            address: "",
            description: "",
            Availability: "",
            city_id: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditVaue = (elm) => {
    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({
      id: elm.id,
      name: elm.name,
      email: elm.email,
      mobile: elm.mobile,
      gender: elm.gender,
      address: elm.address,
      description: elm.description,
      availability: elm.availability,
      city_id: elm.city_id,
    });
    // setStatusShow(statustype);

    showModal();
  };

  const deleteGuide = (elmId) => {
    setInitialId(elmId);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { guide_id: initialId }; // Update to 'hotel_id'
    const resp = masterService.deleteGuide(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Tour Guide deleted successfully.",
          });
        }
      })
      .catch((err) => {});
  };
  const inputChange = (name) => (e) => {
    let value = e.target ? e.target.value : e;

    // Assuming formFieldValues is the state managing form field values
    setInitialVal({ ...initialVal, [name]: value });
  };
  // const inputChange = (name, id) => (e) => {
  //   setInitialVal({
  //     id: id,
  //     [name]: e.target.value,
  //   });
  // };

  var i = 1;

  return (
    <Card>
      <Row gutter={16} className="justify-content-between my-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </Col>
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          {btnShowHide.add > 0 && (
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Guide
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        listcityAll={listcityAll}
        visible={modalVisible}
        onCreate={addEditGuide}
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

export default Guidelist;
