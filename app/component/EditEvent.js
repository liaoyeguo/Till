import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import moment from "moment";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon,
  List
} from "antd";
import "./edit-event.css";

const Search = Input.Search;

@inject("eventsStore")
@observer
class CategoryItem extends Component {
  handleDelete = () => {
    const { item } = this.props;
    const { eventsStore } = this.props;
    eventsStore.removeCategory(item);
  };
  render() {
    const { item } = this.props;
    return (
      <div className="cat-item">
        <span>{item.name}</span>
        <a className="delet-cat" onClick={this.handleDelete}>
          <Icon type="close" />
        </a>
      </div>
    );
  }
}
@inject("eventsStore")
@observer
class EditEvent extends Component {
  state = {
    title: "",
    deadline: null,
    category: "null",
    categoryMan: "none"
  };

  handleInput = e => {
    const { eventsStore } = this.props;
    const { curEditEvent } = eventsStore;
    if (curEditEvent) curEditEvent.title = e.target.value;
    else
      this.setState({
        title: e.target.value
      });
  };
  handleDate = date => {
    const { eventsStore } = this.props;
    const { curEditEvent } = eventsStore;
    if (curEditEvent) curEditEvent.deadline = date.format();
    else
      this.setState({
        deadline: date
      });
  };

  handleSubmit = e => {
    const { eventsStore } = this.props;
    const category = this.state.category == "null" ? null : this.state.category;
    eventsStore.addEvent(this.state.title, this.state.deadline, category);
    this.setState({
      title: "",
      deadline: null,
      category: "null"
    });
    eventsStore.isEditing = false;
  };
  handleCatChange = value => {
    const { eventsStore } = this.props;
    const { curEditEvent } = eventsStore;
    if (curEditEvent) curEditEvent.category = value;
    else
      this.setState({
        category: value
      });
  };
  handdleClose = () => {
    const { eventsStore } = this.props;
    eventsStore.isEditing = false;
    eventsStore.curEditEvent = null;
  };
  handleDelete = () => {
    const { eventsStore } = this.props;
    const { curEditEvent } = eventsStore;
    curEditEvent.remove();
    this.handdleClose();
  };
  disabledDate = current => {
    return current && current <= moment();
  };
  handdleCateInput = () => {
    this.setState({
      categoryMan: "new"
    });
  };
  handlenNewCate = e => {
    this.setState({
      categoryMan: "none"
    });
    const { eventsStore } = this.props;
    eventsStore.addCategory(e.target.value.trim());
  };

  handleShowMan = () => {
    this.setState({ categoryMan: "edit" });
  };

  handleHideCateMan = () => {
    this.setState({ categoryMan: "none" });
  };
  render() {
    const { eventsStore } = this.props;
    const { curEditEvent } = eventsStore;
    const categories = eventsStore.getCategory();
    const options = categories.map(tag => (
      <Option value={tag.id} key={tag.id}>
        {tag.name}
      </Option>
    ));

    let newCate;
    if (this.state.categoryMan == "none") {
      newCate = (
        <div className="new-man">
          <a onClick={this.handdleCateInput}>
            <Icon type="plus-circle" /> 新分类
          </a>
          <a onClick={this.handleShowMan} className="man">
            <Icon type="form" /> 管理
          </a>
        </div>
      );
    } else if (this.state.categoryMan == "new") {
      newCate = (
        <Input
          suffix={<Icon type="enter" />}
          style={{ marginTop: "16px" }}
          onPressEnter={this.handlenNewCate}
        />
      );
    } else {
      newCate = (
        <div className="categories">
          <List
            size="small"
            bordered
            dataSource={categories}
            footer={
              <Button icon="check" onClick={this.handleHideCateMan} block>
                完成
              </Button>
            }
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item>
                <CategoryItem item={item} />
              </List.Item>
            )}
          />
        </div>
      );
    }
    return (
      <Drawer
        width={360}
        closable={false}
        onClose={this.handdleClose}
        visible={eventsStore.isEditing}
        destroyOnClose
        style={{
          overflow: "auto",
          height: "calc(100% - 108px)",
          paddingBottom: "108px"
        }}
      >
        <div className="edit-event">
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="事件名称">
                  <Input
                    placeholder="请输入事件名称"
                    onChange={this.handleInput}
                    value={
                      (curEditEvent && curEditEvent.title) || this.state.title
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="分类">
                  <Select
                    placeholder="请选择分类"
                    onChange={this.handleCatChange}
                    value={
                      (curEditEvent && curEditEvent.category) ||
                      this.state.category
                    }
                  >
                    <Option value="null">无分类</Option>
                    {options}
                  </Select>
                  {newCate}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="DateTime">
                  <DatePicker
                    showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                    disabledDate={this.disabledDate}
                    className="date-picker"
                    style={{ width: "100%" }}
                    onChange={this.handleDate}
                    value={
                      (curEditEvent && moment(curEditEvent.deadline)) ||
                      this.state.deadline
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            {curEditEvent ? (
              <Form.Item>
                <Button
                  icon="close"
                  htmlType="submit"
                  onClick={this.handleDelete}
                  block
                >
                  删除
                </Button>
              </Form.Item>
            ) : (
              <Form.Item>
                <Button
                  icon="check"
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  block
                  disabled={
                    this.state.title.trim().length <= 0 || !this.state.deadline
                  }
                >
                  确定
                </Button>
              </Form.Item>
            )}
          </Form>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "center"
            }}
          >
            <Button
              className="close"
              icon="swap-left"
              onClick={this.handdleClose}
              block
            >
              关闭
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default EditEvent;
