import React, { useState } from "react"
import { Link } from "react-router-dom"
import { List, TextareaItem, PickerView, WhiteSpace, Modal } from 'antd-mobile';
import "./addAddress.scss"

const addAddress: React.FC = () => {

    // const [modal, setModal] = useState(false);

    // const showModal = () => {
    //     setModal(true)
    // }

    // const province = [
    //     {
    //         label: '北京',
    //         value: '01',
    //         children: [
    //             {
    //                 label: '东城区',
    //                 value: '01-1',
    //             },
    //             {
    //                 label: '西城区',
    //                 value: '01-2',
    //             },
    //             {
    //                 label: '崇文区',
    //                 value: '01-3',
    //             },
    //             {
    //                 label: '宣武区',
    //                 value: '01-4',
    //             },
    //         ],
    //     },
    //     {
    //         label: '浙江',
    //         value: '02',
    //         children: [
    //             {
    //                 label: '杭州',
    //                 value: '02-1',
    //                 children: [
    //                     {
    //                         label: '西湖区',
    //                         value: '02-1-1',
    //                     },
    //                     {
    //                         label: '上城区',
    //                         value: '02-1-2',
    //                     },
    //                     {
    //                         label: '江干区',
    //                         value: '02-1-3',
    //                     },
    //                     {
    //                         label: '下城区',
    //                         value: '02-1-4',
    //                     },
    //                 ],
    //             },
    //             {
    //                 label: '宁波',
    //                 value: '02-2',
    //                 children: [
    //                     {
    //                         label: 'xx区',
    //                         value: '02-2-1',
    //                     },
    //                     {
    //                         label: 'yy区',
    //                         value: '02-2-2',
    //                     },
    //                 ],
    //             },
    //             {
    //                 label: '温州',
    //                 value: '02-3',
    //             },
    //             {
    //                 label: '嘉兴',
    //                 value: '02-4',
    //             },
    //             {
    //                 label: '湖州',
    //                 value: '02-5',
    //             },
    //             {
    //                 label: '绍兴',
    //                 value: '02-6',
    //             },
    //         ],
    //     },
    // ];
    // const { getFieldProps } = useState();
    return (<div>
        <List>
            <TextareaItem
                title="收货人"
                placeholder="名字"
                data-seed="logId"
                autoHeight
            />
            <TextareaItem
                title="手机号码"
                placeholder="手机号"
                data-seed="logId"
                autoHeight
            />
            <TextareaItem
                title="选择地区"
                placeholder="省、市、区、街道"
                data-seed="logId"
                autoHeight
            // onClick={showModal}
            />
            {/* <Modal
                popup
                visible={modal}
                animationType="slide-up"
            >
                <PickerView
                    data={province}
                    value={['02', '02-1', '02-1-1']}
                />
            </Modal> */}
            {/* <PickerView
                data={province}
                value={['02', '02-1', '02-1-1']}
            /> */}
            <TextareaItem
                title="详细地址"
                placeholder="小区楼栋/乡村名称"
                data-seed="logId"
                autoHeight
            />
            <List.Item>
                <div
                    style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                    
                  onClick={() => console.log("888888")
                  }
                >
                    {/* <Link to="/address/?title=我的收获地址"> */}
                        <button className="addAddress-btn" >保存</button>
                    {/* </Link> */}
                </div>
            </List.Item>
        </List>
    </div>)
}

export default addAddress