import React, { useState, useEffect } from "react";
import Flex from "components/shared-components/Flex";
import { Row, Col, Card, Form, Switch, notification, Button } from "antd";
import { useParams } from "react-router-dom";
import masterService from "../../../../../services/MasterService";

const AddPermission = (props) => {
  const { id } = useParams();
  const [permissionList, setPermissionList] = useState([]);
  const [role, setRole] = useState([]);
  const [roleValue, setRoleValue] = useState([])


  const listPermission = () => {
    const reqeustParam = { is_active: 1, role_id: id };
    try {
      const resp = masterService.getPermission(reqeustParam);
      resp
        .then((res) => {
          setPermissionList(res.data.permissions);
          setRole(res.data.role);
          let arrVal = [];
          const permissval = res.data.permissions;
          //console.log(permissval)
          permissval.map((item) => {
            if (item.is_checked) {
              //return item.id
              arrVal.push(item.id)


            }
            item.permissions.map((itm) => {
              if (itm.is_checked) {
                arrVal.push(itm.id)
              }

              itm.permissions.map((it) => {
                if (it.is_checked) {
                  arrVal.push(it.id)
                }

              })

            })


          })


          setRoleValue(arrVal)

        })
        .catch((err) => { });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listPermission();
  }, []);

  const onFinish = () => {
    const rolevalueData = roleValue.filter((listitem, index) => {
      if (roleValue.indexOf(listitem) === index) {
        return listitem
      }

    })


    const data = { role_id: id, permission_id: [...rolevalueData] };
    //console.log(data)
    const resp = masterService.assignPermission(data);
    resp
      .then((res) => {

        listPermission();
        notification.success({
          message: res.message,
        });
      })
      .catch((err) => {
        notification.error({
          message: err.message,
        });
      });
      


  };

  const onFinishValue = (permission_id) => (e) => {
    //let data = { role_id: id, permission_id: permission_id };
    //console.log(e, permission_id)
    if (e) {
      setRoleValue([...roleValue, permission_id])
      //setRoleValueChecked([...roleValueChecked,permission_id])
    } else {
      const index = roleValue.indexOf(permission_id);
      if (index > -1) {
        //console.log(roleValue)
        const rolevalueData = roleValue.filter((listitem, index) => {
          if (roleValue.indexOf(listitem) === index) {
            return listitem
          }
    
        })
        
        rolevalueData.splice(index, 1);
        //console.log(rolevalueData)
        setRoleValue(rolevalueData) 
      }
    }

  }


  return (
    <>
      <Form
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <div className="container123">
          <Card title={`Assign Permission to ${role.name} Role`}>
            <hr className="mb-lg-3" />
            <div className="text-right"><Button type="primary" onClick={onFinish}>Save</Button></div>
            {

              permissionList &&
              permissionList.map((item) => {

                return (
                  <>
                    <Row key={item.id} gutter={16}>
                      <Col xs={24} sm={24} md={12} className="mb-4">
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          className="w-100"
                        >
                          <div className="d-flex align-items-center">
                            <div className="ml-3">
                              <h4 className="mb-0">{item.title}</h4>
                            </div>
                          </div>
                          <div className="ml-3">
                            <Switch
                              //{item.is_checked?defaultChecked:''}
                              defaultChecked={item.is_checked}
                              onChange={onFinishValue(item.id)}

                            />
                          </div>
                        </Flex>
                      </Col>
                    </Row>

                    <div className="px-lg-5">
                      {item.permissions.map((itm) => {
                        return (
                          <>
                            <Row className="px-lg-5" gutter={16}>
                              <Col xs={24} sm={24} md={12} className="mb-4">
                                <Flex
                                  justifyContent="space-between"
                                  alignItems="center"
                                  className="w-100"
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="ml-3">
                                      <h4 className="mb-0">{itm.title}</h4>
                                    </div>
                                  </div>
                                  <div className="ml-3">
                                    <Switch
                                      //checked={itm.is_checked}
                                      defaultChecked={itm.is_checked}
                                      onChange={onFinishValue(itm.id)}
                                    />
                                  </div>
                                </Flex>
                              </Col>
                            </Row>
                            <Row id="" className="px-lg-5" gutter={16}>
                              {itm.permissions.map((it) => {
                                return (
                                  <Col xs={24} sm={24} md={12} className="mb-4">
                                    <Flex
                                      justifyContent="space-between"
                                      alignItems="center"
                                      className="w-100"
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="ml-3">
                                          <p className="mb-0">{it.title}</p>
                                        </div>
                                      </div>
                                      <div className="ml-3">
                                        <Switch
                                          //checked={it.is_checked}
                                          defaultChecked={it.is_checked}
                                          onChange={onFinishValue(it.id)}
                                        />
                                      </div>
                                    </Flex>
                                  </Col>
                                );
                              })}
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}

            <div className="text-right"><Button type="primary" onClick={onFinish}>Save</Button></div>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default AddPermission;
