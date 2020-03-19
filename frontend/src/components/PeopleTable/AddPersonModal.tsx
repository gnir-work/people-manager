import React, { useState } from "react";
import AddButton from "../actions/AddButton";
import { Modal, Button, Form, Input, Radio, Checkbox } from "antd";
import {
  PERSON_STATUSES,
  AVAILABILITY,
  PERSON_PREFERENCES,
  SUBJECTS,
  MEGAMUT
} from "../../consts";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../tags/TagList";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const AddPersonModal: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const addPerson = () => {
    hideModal();
  };

  return (
    <>
      <AddButton onClick={showModal} />
      <Modal
        title="הוספת איש חוץ"
        visible={visible}
        onCancel={hideModal}
        onOk={addPerson}
        footer={[
          <Button key="back" onClick={hideModal}>
            ביטול
          </Button>,
          <Button key="submit" type="primary" onClick={addPerson}>
            הוספה
          </Button>
        ]}
      >
        <Form
          {...layout}
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item label="שם מלא">
            <Input />
          </Form.Item>
          <Form.Item label="מ.א">
            <Input />
          </Form.Item>
          <Form.Item label="פלאפון">
            <Input />
          </Form.Item>
          <Form.Item label="צוות">
            <Input />
          </Form.Item>
          <Form.Item label="מצב שירות">
            <Radio.Group>
              {PERSON_STATUSES.map(status => (
                <Radio value={status}>{status}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="זמינות">
            <Radio.Group>
              {AVAILABILITY.map(availability => (
                <Radio value={availability}>{availability}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="סגל עבר">
            <Checkbox />
          </Form.Item>
          <Form.Item label="העדפות">
            <TagList
              additionalPossibleTags={PERSON_PREFERENCES}
              onTagsChange={() => {}}
              additionText="הוספת העדפה"
            />
          </Form.Item>
          <Form.Item label="מגמות">
            <TagList
              additionalPossibleTags={MEGAMUT}
              onTagsChange={() => {}}
              additionText="הוספת מגמה"
            />
          </Form.Item>
          <Form.Item label="מערכים">
            <TagList
              additionalPossibleTags={SUBJECTS}
              onTagsChange={() => {}}
              additionText="הוספת מערך"
            />
          </Form.Item>
          <Form.Item label="הערות נוספות">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPersonModal;
