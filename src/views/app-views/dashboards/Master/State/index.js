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
  listcountryAll,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    Id: initialVal.id,

    name: initialVal.name,
    country_id: initialVal.country_id,
    statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit State" : "Add New State"}
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
        name="addState"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          country: initialVal.country,
          is_active: statusShow,
        }}
      >
        <Form.Item
          label="Country Name"
          name="country_id"
          rules={[
            {
              required: true,
              message: "Please select Country Name!",
            },
          ]}
        >
  
          <Select
            onChange={inputChange("country_id")}
            showSearch
            placeholder="Select Country Name"
            
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            
            {listcountryAll &&
              listcountryAll.map((listCType) => (
                <Option key={listCType.id} value={listCType.id}>
                  {listCType.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

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
      title="State"
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

const Statelist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    name: "",
    country_id: "",
  });
  const [listcountryAll, setlistcountryAll] = useState([]);
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
      const resp = masterService.getState(reqeustParam);
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

  const listcountryData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getCountry(reqeustParam);
      resp
        .then((res) => {
          console.log(res);

          setlistcountryAll(res.data);
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
    listcountryData();

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
      title: "Country",
      render: (_, elm) => <>{elm.country?.name}</>,
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
                  deleteState(elm.id);
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
    setInitialVal({ id: "", name: "", country_id: "" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditState = (values) => {
    let countrystatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        state_id: initialVal.id,
        name: values.name,
        country_id: values.country_id,
        is_active: countrystatus,
      };
      const resp = masterService.editState(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "State updated successfully.",
          });
          setInitialVal({ state_id: "", name: "", country_id: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        name: values.name,
        country_id: values.country_id,
        is_active: countrystatus,
      };
      const resp = masterService.addState(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
            // listData();
          }

          notification.success({ message: "State added successfully." });
          setInitialVal({ state_id: "", name: "", country_id: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditVaue = (elm) => {
    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name, country_id: elm.country_id });
    setStatusShow(statustype);

    showModal();
  };

  const deleteState = (elmId) => {
    setInitialId(elmId);
    setModalVisibleConfirmation(true);
  };
  
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  // const onOKConfirm = () => {
  //   const reqeustParam = { country_id: initialId };
  //   const resp = masterService.deleteState(reqeustParam);
  //   resp
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setModalVisibleConfirmation(false);
  //         listData();
  //         notification.success({
  //           message: "State deleted successfully.",
  //         });
  //       }
  //     })
  //     .catch((err) => {});
  // };

  const onOKConfirm = () => {
    const reqeustParam = { state_id: initialId }; // Update to 'hotel_id'
    const resp = masterService.deleteState(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Hotel deleted successfully.",
          });
        }
      })
      .catch((err) => {});
  };

  const inputChange = (name) => (e) => {
    let value = e.target ? e.target.value : e;

    // Assuming formFieldValues is the state managing form field values
    setInitialVal({ ...initialVal, [name]: value })
    ;
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
              Add State
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        listcountryAll={listcountryAll}
        visible={modalVisible}
        onCreate={addEditState}
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

export default Statelist;
