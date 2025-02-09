import React, { JSX, useState } from 'react';
import classes from './income-create-edit.component.module.scss';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { IncomeModel } from 'src/models/income.model';
import { BuyerModel } from 'src/models/buyer.model';
import { IncomeService } from 'src/services/income.service';
import { BuyerService } from 'src/services/buyer.service';
import { useListManager } from 'src/common/hooks/list-manager.hook';

interface CreateFormPropsI {
  incomeCreateEditFn: (income: IncomeModel) => void;
  oid?: string;
}

const transformEntity = (
  entity: BuyerModel
): { oid: string; label: string; value: string } => ({
  oid: entity.oid,
  value: entity.oid,
  label: entity.name,
});

export const IncomeCreateEdit: React.FC<CreateFormPropsI> = (
  props
): JSX.Element => {
  const { t } = useTranslation();
  const [loadingCreateEdit, setLoadingCreateEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const payload = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      buyer: getEntity(values.buyer),
    };
    setLoadingCreateEdit(true);
    IncomeService.createEntity(payload)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setLoadingCreateEdit(false);
        setOpen(false);
        props.incomeCreateEditFn(data);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const {
    data: buyers,
    setQuickSearch,
    getEntity,
  } = useListManager(BuyerService.searchEntities, transformEntity);

  return (
    <>
      {!props.oid && (
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          {t('createIncome')}
        </Button>
      )}
      {props.oid && <Button onClick={showModal} icon={<EditOutlined />} />}
      <Modal
        open={open}
        title={t('createIncome')}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={[
          <Button key="link" loading={loadingCreateEdit} onClick={handleCancel}>
            {t('cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingCreateEdit}
            onClick={handleSave}
          >
            {t('save')}
          </Button>,
        ]}
      >
        <Form form={form} className={classes.form}>
          <Form.Item name="buyer" label={t('buyer')}>
            <Select
              showSearch
              onSearch={(searchText) => setQuickSearch(searchText)}
              placeholder={t('buyer')}
              options={buyers}
            ></Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label={t('amount')}
            rules={[
              { required: true, message: t('requiredField') },
              {
                type: 'number',
                min: 0,
                message: 'Amount must be greater than 0',
              },
            ]}
          >
            <InputNumber min={0.01} />
          </Form.Item>
          <Form.Item
            name="date"
            label={t('date')}
            rules={[{ required: true, message: 'Date is required' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="bankStatementNumber"
            label={t('bankStatementNumber')}
          >
            <Input />
          </Form.Item>
          <Form.Item name="comment" label={t('comment')}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
