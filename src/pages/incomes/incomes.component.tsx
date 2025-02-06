import React, { JSX, useState } from 'react';
import classes from './incomes.component.module.scss';
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  MenuProps,
  Space,
  Table,
  TableProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { IncomeService } from 'src/services/income.service';
import { useListManager } from 'src/common/hooks/list-manager.hook';
import { IncomeModel } from 'src/models/income.model';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from 'src/components/shared/search-input/search-input.component';

interface InvoiceTableDataType {
  key: string;
  oid: string;
  buyerName: string;
  date: Date;
  amount: number;
  bankStatementNumber: string;
  comment: string;
}

const transformEntity = (entity: IncomeModel): InvoiceTableDataType => ({
  key: entity.oid,
  oid: entity.oid,
  date: entity.date,
  amount: entity.amount,
  bankStatementNumber: entity.bankStatementNumber,
  buyerName: entity.buyer.name,
  comment: entity.comment,
});

export const Incomes: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: incomes,
    setSorting,
    setSearch,
  } = useListManager(IncomeService.searchEntities, transformEntity);

  const columns: TableProps<InvoiceTableDataType>['columns'] = [
    {
      title: t('buyerName'),
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: t('bankStatementNumber'),
      dataIndex: 'bankStatementNumber',
      key: 'bankStatementNumber',
    },
    {
      title: t('comment'),
      key: 'comment',
      dataIndex: 'comment',
    },
    {
      title: t('edit'),
      key: 'action',
    },
    {
      title: t('delete'),
      key: 'action',
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: t('asc'),
      key: 'ASC',
    },
    {
      label: t('desc'),
      key: 'DESC',
    },
  ];

  const incomeCreateEditPopup = () => {
    // TODO
  };

  const onSortClick: MenuProps['onClick'] = ({ key }) => {
    setSorting(key);
  };

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Space.Compact>
          <SearchInput
            placeholder={t('searchFor')}
            onSearch={(value) => setSearch(value)}
          />
        </Space.Compact>
        <DatePicker placeholder={t('fromDate')} />
        <DatePicker placeholder={t('toDate')} />
        <Dropdown menu={{ items, onClick: onSortClick }} trigger={['click']}>
          <Button>
            Sort <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          onClick={() => {
            navigate('/outcomes');
          }}
        >
          {t('outcomes')}
        </Button>
        <Button onClick={incomeCreateEditPopup}>{t('createIncome')}</Button>
      </div>
      <Table<InvoiceTableDataType>
        columns={columns}
        dataSource={incomes}
        pagination={false}
        scroll={{ y: 'max-content' }}
      />
    </div>
  );
};
