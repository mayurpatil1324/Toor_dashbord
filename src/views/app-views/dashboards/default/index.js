import { Anchor, Button, Card, Col, Form, Row, Select, Spin, Timeline, message } from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  CloseOutlined,
  CloudUploadOutlined,
  SearchOutlined,
  RightSquareOutlined,
  CheckCircleOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  EditOutlined,
  UploadOutlined,
  UserAddOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  ShoppingCartOutlined,
  RestOutlined,
  CheckOutlined
} from "@ant-design/icons";
import masterService from 'services/MasterService';
import SettingService from 'services/SettingService';
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import { YEARS, MONTHS } from "constants/AuthConstant";
import { STUDENT_STATUS_LIST } from "constants/AuthConstant";

const { Option } = Select;
const DefaultDashboard = () => {
  const navigate = useNavigate()
  const [countryList, setCountryList] = useState([]);
  const [partnerList, setPartnerList] = useState([])
  const [showAppStaus, setShowAppStatus] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false);
  const [countDashboard, setCountDashboard] = useState([])
  const [showLoader, setShowLoader] = useState(false);
  const [showColumn, setShowColumn] = useState(4)
  const [showSearchValue, setShowSearchValue] = useState([])
  const auth_details = JSON.parse(useSelector(state => state.auth.auth_details))
  const [form] = Form.useForm();
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,

  });


  const listCountryData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getCountry(reqeustParam);
      resp
        .then((res) => {
          //console.log(res.data)
          setCountryList(res.data);
        })
        .catch((err) => { });
    } catch (errors) {
      console.log(errors);
    }
  };
  const listDataPartner = (roleId) => {
    const reqeustParam = { role_id: roleId };
    try {
      const resp = SettingService.getUser(reqeustParam);
      resp
        .then((res) => {
          setPartnerList(res.data)

        })
        .catch((err) => { });
    } catch (errors) {
      console.log(errors);
    }
  };
  const appStatusData = () => {
    //const reqeustParam = { is_active: 1 }
    try {

      //const studentId = parseInt(userDetail.id)
      const reqeustParam = { is_active: 1 }
      const resp = masterService.getGETStatus(reqeustParam);


      resp.then(res => {
        //console.log(res)
        setShowAppStatus(res.data)



      })
        .catch(err => {

        })

    } catch (errors) {
      console.log(errors)
    }
  }

  const appShowDashboard = () => {
    //const reqeustParam = { is_active: 1 }
    try {
      const reqeustParam = {}
      const resp = masterService.getDashboard(reqeustParam);
      resp.then(res => {
        setCountDashboard(res)

      })
        .catch(err => {

        })

    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    //console.log(auth_details)
    if (!auth_details) {
      window.location.reload();
    } else if (auth_details.is_change == 0) {
      //navigate('/dashboards/change-password')
    } else if (auth_details.user_type == 'student') {
      //navigate(`/dashboards/student-detail/${auth_details.student_id}`)
    } 

    //listCountryData()
    //listDataPartner(3)
    //appStatusData()
    //appShowDashboard()
    
  }, [])

  const resetFormData = () => {
    form.resetFields();
    onFinish()

  };

  const onFinish = () => {
    setSubmitLoading(true);
    setShowLoader(true)
    form
      .validateFields()
      .then((values) => {
        setTimeout(() => {
          setSubmitLoading(false);
          const reqeustParam = {}
          const resp = masterService.getDashboard(values);
          resp.then(res => {
            setShowSearchValue(values)
            setCountDashboard(res)
            setShowLoader(false)

          })
            .catch(err => {

            })


        }, 1500);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
      });
  };

  const onFinishGoApp = (val,val2) => {

    let linkval;
    if (showSearchValue.agent_id) {
      linkval = `?agent_id=${showSearchValue.agent_id}`;
    } else {
      linkval = `?agent_id=0`;
    }
    if (showSearchValue.application_status) {
      if(val2 > 0){
        linkval += `&application_status=${val2}`;  
      } else {
      linkval += `&application_status=${showSearchValue.application_status}`;
      }
    } else {
      if(val2 > 0){
        linkval += `&application_status=${val2}`;  
      } else {
      linkval += `&application_status=0`;
      }
    }
    if (showSearchValue.country_id) {
      linkval += `&country_id=${showSearchValue.country_id}`;
    } else {
      linkval += `&country_id=0`;
    }
    if (showSearchValue.intake_month) {
      linkval += `&intake_month=${showSearchValue.intake_month}`;
    } else {
      linkval += `&intake_month=0`;
    }
    if (showSearchValue.intake_year) {
      linkval += `&intake_year=${showSearchValue.intake_year}`;
    } else {
      linkval += `&intake_year=0`;
    }
    if (showSearchValue.student_status) {
      linkval += `&student_status=${showSearchValue.student_status}`;
    } else {
      linkval += `&student_status=0`;
    }

    if(val == 2){
    navigate(`/dashboards/student-list${encodeURI(linkval)}`)
    }else{
      navigate(`/dashboards/application-list${encodeURI(linkval)}`)
    }

  }

  return (
    <>
      {btnShowHide.add > 0 &&
        <Spin size="large" spinning={showLoader}>
          
          <div className='text-center' style={{fontSize:`35px`, color:`#0964DD`}}>
            <strong>Welcome to</strong>
          </div>
          <div className='text-center' style={{fontSize:`35px`, color:`#343537`}}>
          <strong>ABSAX</strong>
          </div>
          
        </Spin>


      }

    </>
  )
}


export default DefaultDashboard;
