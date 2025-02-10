import React, { JSX, useState } from 'react';
import classes from './income-create-edit.component.module.scss';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { IncomeModel } from 'src/models/income.model';
import { BuyerModel } from 'src/models/buyer.model';
import { IncomeService } from 'src/services/income.service';
import { BuyerService } from 'src/services/buyer.service';
import { useListManager } from 'src/common/hooks/list-manager.hook';

interface CreateFormPropsI {
  onClose: (income?: IncomeModel) => void;
  oid?: string;
}

const transformEntity = (
  entity: BuyerModel
): { oid: string; label: string; value: string } => ({
  oid: entity.oid,
  value: entity.oid,
  label: entity.name,
});

export const IncomeCreateEdit: React.FC<CreateFormPropsI> = ({
  onClose,
  oid,
}): JSX.Element => {
  const { t } = useTranslation();
  const [loadingCreateEdit, setLoadingCreateEdit] = useState(false);
  const [form] = Form.useForm();

  console.log(oid);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : null,
        buyer: getEntity(values.buyer),
      };
      setLoadingCreateEdit(true);
      const { data } = await IncomeService.createEntity(payload);
      setLoadingCreateEdit(false);
      onClose(data);
    } catch (error) {
      setLoadingCreateEdit(false);
    }
  };

  const {
    data: buyers,
    setQuickSearch,
    getEntity,
  } = useListManager(BuyerService.searchEntities, transformEntity);

  return (
    <Form form={form} className={classes.form}>
      <Form.Item name="buyer" label={t('buyer')}>
        <Select
          showSearch
          onSearch={(searchText) => setQuickSearch(searchText)}
          placeholder={t('buyer')}
          options={buyers}
        />
      </Form.Item>
      <Form.Item
        name="amount"
        label={t('amount')}
        rules={[
          { required: true, message: t('requiredField') },
          { type: 'number', min: 0, message: 'Amount must be greater than 0' },
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
      <Form.Item name="bankStatementNumber" label={t('bankStatementNumber')}>
        <Input />
      </Form.Item>
      <Form.Item name="comment" label={t('comment')}>
        <Input />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button loading={loadingCreateEdit} onClick={() => onClose()}>
          {t('cancel')}
        </Button>
        <Button type="primary" loading={loadingCreateEdit} onClick={handleSave}>
          {t('save')}
        </Button>
      </div>
    </Form>
  );
};
