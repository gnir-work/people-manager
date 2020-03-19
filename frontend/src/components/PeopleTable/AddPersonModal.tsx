import React, { useState } from "react";
import AddButton from "../actions/AddButton";
import { Modal, Form, Input, Radio, Checkbox } from "antd";
import {
  PERSON_STATUSES,
  AVAILABILITY,
  PERSON_PREFERENCES,
  SUBJECTS,
  MEGAMUT,
  MEGAMUT_TO_COLOR,
  PREFERENCE_TO_COLOR
} from "../../consts";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../tags/TagList";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const initialValues = {
  fullName: "",
  personId: "",
  phone: "",
  status: PERSON_STATUSES[0],
  team: "",
  preferences: [],
  megamut: [],
  subjects: [],
  availability: AVAILABILITY[0],
  wasSegel: false,
  remarks: ""
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

  return (
    <>
      <AddButton onClick={showModal} />
      <Modal
        onOk={() => {
          form
            .validateFields()
            .then((values: any) => {
              form.resetFields();
              console.log(values);
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
        }}
        title="הוספת איש חוץ"
        visible={visible}
        onCancel={hideModal}
        okText="הוספה"
        cancelText="ביטול"
      >
        <Form
          {...layout}
          form={form}
          name="form_in_modal"
          initialValues={initialValues}
        >
          <Form.Item name="fullName" label="שם מלא">
            <Input />
          </Form.Item>
          <Form.Item name="personId" label="מ.א">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="פלאפון">
            <Input />
          </Form.Item>
          <Form.Item name="team" label="צוות">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="מצב שירות">
            <Radio.Group>
              {PERSON_STATUSES.map(status => (
                <Radio key={status} value={status}>
                  {status}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="availability" label="זמינות">
            <Radio.Group>
              {AVAILABILITY.map(availability => (
                <Radio key={availability} value={availability}>
                  {availability}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="wasSegel" label="סגל עבר" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item name="preferences" label="העדפות">
            <TagList
              possibleTags={PERSON_PREFERENCES}
              colors={PREFERENCE_TO_COLOR}
              additionText="הוספת העדפה"
            />
          </Form.Item>
          <Form.Item name="megamut" label="מגמות">
            <TagList
              possibleTags={MEGAMUT}
              colors={MEGAMUT_TO_COLOR}
              additionText="הוספת מגמה"
            />
          </Form.Item>
          <Form.Item name="subjects" label="מערכים">
            <TagList possibleTags={SUBJECTS} additionText="הוספת מערך" />
          </Form.Item>
          <Form.Item name="remarks" label="הערות נוספות">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPersonModal;
