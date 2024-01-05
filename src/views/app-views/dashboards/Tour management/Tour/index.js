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
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import masterService from "../../../../../services/MasterService";

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

  form.setFieldsValue({
    tour: initialVal.id,
    tour: initialVal.title,
    tour: initialVal.heading,
    tour: initialVal.description,
    tour: initialVal.date,
    tour: initialVal.duration,
    tour: initialVal.category_id,
    tour: initialVal.city_id,
    tour: initialVal.image_id,
    


    statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit Tour" : "Add New Tour"}
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
        name="addTour"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          title: initialVal.title,
          heading: initialVal.heading,
          description: initialVal.description,
          date: initialVal.date,
          duration: initialVal.duration,
          category_id: initialVal.category_id,
          city_id: initialVal.city_id,
          image_id: initialVal.image_id,
          is_active: statusShow,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title!",
            },
          ]}
        >
          <Input
            placeholder="Title"
            onChange={inputChange("title", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Heading"
          name="heading"
          rules={[
            {
              required: true,
              message: "Please enter heading!",
            },
          ]}
        >
          <Input
            placeholder="Heading"
            onChange={inputChange("heading", initialVal.id)}
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
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please enter date!",
            },
          ]}
        >
          <Input
            placeholder="Date"
            onChange={inputChange("date", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            {
              required: true,
              message: "Please enter duration!",
            },
          ]}
        >
          <Input
            placeholder="Duration"
            onChange={inputChange("duration", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Category Id"
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please enter category_id!",
            },
          ]}
        >
          <Input
            placeholder="Category Id"
            onChange={inputChange("category_id", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="City Id"
          name="city_id"
          rules={[
            {
              required: true,
              message: "Please enter city_id!",
            },
          ]}
        >
          <Input
            placeholder="City Id"
            onChange={inputChange("city_id", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Image Id"
          name="image_id"
          rules={[
            {
              required: true,
              message: "Please enter image_id!",
            },
          ]}
        >
          <Input
            placeholder="Image Id"
            onChange={inputChange("image_id", initialVal.id)}
          />
        </Form.Item>
        
        
        <Form.Item label="Active" name="statusName">
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
      title="Category"
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

const Tourlist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", title: "",heading:"",description:"",date:"",duration:"",category_id:"",city_id:"",image_id:"" });
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
      const resp = masterService.getTour(reqeustParam);
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

  useEffect(() => {
    listData();
    setBtnShowHide({ add: 1, edit: 1, delete: 1 });
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
        title: "Heading",
        dataIndex: "heading",
        sorter: (a, b) => utils.antdTableSorter(a, b, "heading"),
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
      },
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
      },
      {
        title: "Duration",
        dataIndex: "duration",
        sorter: (a, b) => utils.antdTableSorter(a, b, "duration"),
      },
      {
        title: "Category Id",
        dataIndex: "category_id",
        sorter: (a, b) => utils.antdTableSorter(a, b, "category_id"),
      },
      {
        title: "City Id",
        dataIndex: "city_id",
        sorter: (a, b) => utils.antdTableSorter(a, b, "city_id"),
      },
      {
        title: "Image Id",
        dataIndex: "image_id",
        sorter: (a, b) => utils.antdTableSorter(a, b, "image_id"),
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
                  showEditValue(elm);
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
                    deleteTour(elm.id);
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
    setInitialVal({ id: "", name: "" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditTour = (values) => {
    let tourStatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const requestParam = {
        tour_id: initialVal.id,
        heading: values.heading,
        descriptiontour: values.descriptiontour,
        date: values.date,
        duration: values.duration,
        category_id: values.category_id,
        city_id: values.city_id,
        image_id: values.image_id,
       
        
        is_active: tourStatus,
      };
      const resp = masterService.editTour(requestParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Tour updated successfully.",
          });
          setInitialVal({ id: "", title: "",heading:"",description:"",date:"",duration:"",category_id:"",city_id:"",image_id:"" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const requestParam = { title: values.title, heading: values.heading, description: values.description, date: values.date, duration: values.duration,category_id: values.category_id,image_id: values.image_id, is_active: tourStatus };
      const resp = masterService.addTour(requestParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Tour added successfully." });
          setInitialVal({ id: "", title: "",heading:"",description:"",date:"",duration:"",category_id:"",city_id:"",image_id:"" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditValue = (elm) => {
    let statusType = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name });
    setStatusShow(statusType);

    showModal();
  };

  const deleteTour = (elm) => {
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const requestParam = { category_id: initialId };
    const resp = masterService.deleteTour(requestParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Tour deleted successfully.",
          });
        }
      })
      .catch((err) => {});
  };

  const inputChange = (name, id) => (e) => {
    setInitialVal({
      id: id,
      [name]: e.target.value,
    });
  };

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
              Add Tour
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        onCreate={addEditTour}
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
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default Tourlist;
