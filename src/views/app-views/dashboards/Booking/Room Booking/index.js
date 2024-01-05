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
  listhotelAll,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    Id: initialVal.id,
    hotel_id: initialVal.hotel_id,
    number_of_person: initialVal.number_of_person,
    number_of_bed: initialVal.number_of_bed,
    statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit Room" : "Add New Room"}
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
        name="addRoom"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          hotel_id: initialVal.hotel_id,
          number_of_person: initialVal.number_of_person,
          number_of_bed: initialVal.number_of_bed,
          is_active: statusShow,
        }}
      >
        <Form.Item
          label="Hotel id"
          name="hotel_id"
          rules={[
            {
              required: true,
              message: "Please select Hotel Name!",
            },
          ]}
        >
          <Select
            onChange={inputChange("hotel_id")}
            showSearch
            placeholder="Select Hotel Name"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {listhotelAll &&
              listhotelAll.map((listCType) => (
                <Option key={listCType.id} value={listCType.name}>
                  {listCType.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="number_of_person"
          rules={[
            {
              required: true,
              message: "Please enter Number Of Person!",
            },
          ]}
        >
          <Input
            placeholder="Number Of Person"
            onChange={inputChange("number_of_person", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Number Of Bed"
          name="number_of_bed"
          rules={[
            {
              required: true,
              message: "Please enter Location!",
            },
          ]}
        >
          <Input
            placeholder="Number Of Bed"
            onChange={inputChange("number_of_bed", initialVal.id)}
          />
        </Form.Item>

        <Form.Item label=" Active" name="statusName">
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
      title="Room"
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

const Roomlist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    hotel_id: "",
    number_of_person: "",
    number_of_bed: "",
  });
  const [listhotelAll, setlisthotelAll] = useState([]);
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
      const resp = masterService.getRoom(reqeustParam);
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

  const listHotelData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getHotel(reqeustParam);
      resp
        .then((res) => {
          console.log(res);

          setlisthotelAll(res.data);
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
    listHotelData();

    // Fetch data for listdepartmentAll
    setBtnShowHide({ add: 1, edit: 1, delete: 1 });
  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Hotel Name",
      render: (_, elm) => <>{elm.hotel?.name}</>,
    },
    {
      title: "Number Of Person",
      dataIndex: "number_of_person",
      sorter: (a, b) => utils.antdTableSorter(a, b, "number_of_person"),
    },

    {
      title: "Number Of Bed",
      dataIndex: "number_of_bed",
      sorter: (a, b) => utils.antdTableSorter(a, b, "number_of_bed"),
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
                  deleteRoom(elm.id);
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
      hotel_id: "",
      number_of_person: "",
      number_of_bed: "",
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditRoom = (values) => {
    let roomstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        room_id: initialVal.id,
        hotel_id: values.hotel_id,
        number_of_person: values.number_of_person,
        number_of_bed: values.number_of_bed,
        is_active: roomstatus,
      };
      const resp = masterService.editRoom(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Room updated successfully.",
          });
          setInitialVal({
            room_id: "",
            hotel_id: "",
            number_of_person: "",
            number_of_bed: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        hotel_id: values.hotel_id,
        number_of_person: values.number_of_person,
        number_of_bed: values.number_of_bed,
        is_active: roomstatus,
      };
      const resp = masterService.addRoom(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Room added successfully." });
          setInitialVal({
            room_id: "",
            hotel_id: "",
            number_of_person: "",
            number_of_bed: "",
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
      hotel_id: elm.hotel_id,
      number_of_person: elm.number_of_person,
      number_of_bed: elm.number_of_bed,
    });
    setStatusShow(statustype);

    showModal();
  };

  const deleteRoom = (elmId) => {
    setInitialId(elmId);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { room_id: initialId }; // Update to 'hotel_id'
    const resp = masterService.deleteRoom(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Room deleted successfully.",
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
              Add Hotel
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        listhotelAll={listhotelAll}
        visible={modalVisible}
        onCreate={addEditRoom}
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

export default Roomlist;
