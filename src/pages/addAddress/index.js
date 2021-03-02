import React, { useState } from "react";
import { List, TextareaItem } from "antd-mobile";
import "./addAddress.scss";

const addAddress = () => {
  return (
    <div>
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
            style={{ width: "100%", color: "#108ee9", textAlign: "center" }}
            onClick={(e) => console.log(e, "888888")}
          >
            {/* <Link to="/address/?title=我的收获地址"> */}
            <button className="addAddress-btn">保存</button>
            {/* </Link> */}
          </div>
        </List.Item>
      </List>
    </div>
  );
};

export default addAddress;
