import React, { JSX, useMemo, useState } from 'react';
import classes from './incomes.component.module.scss';
import { Table, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { IncomeService } from 'src/services/income.service';
import { useListManager } from 'src/common/hooks/list-manager.hook';
import { IncomeModel } from 'src/models/income.model';
import { SearchModel } from 'src/models/search.model';

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

  return (
    <div className={classes.container}>
      <Table<InvoiceTableDataType>
        columns={columns}
        dataSource={incomes}
        pagination={false}
        scroll={{ y: 'max-content' }}
      />
    </div>
  );
};
