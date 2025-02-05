import React, { JSX, useMemo, useState } from 'react';
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
import { SearchModel } from 'src/models/search.model';
import { DownOutlined } from '@ant-design/icons';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

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

const items: MenuProps['items'] = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a
        href="https://www.aliyun.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export const Incomes: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new SearchModel(), []);

  const { data: incomes, loading } = useListManager(
    IncomeService.searchEntities,
    transformEntity,
    searchParams
  );

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

  const incomeCreateEditPopup = () => {
    // TODO
  };

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Space.Compact>
          <Input placeholder={t('searchFor')} width={'auto'} />
        </Space.Compact>
        <DatePicker placeholder={t('fromDate')} />
        <DatePicker placeholder={t('toDate')} />
        <Dropdown menu={{ items }} trigger={['click']}>
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
