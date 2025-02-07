import React, { JSX, useCallback, useRef } from 'react';
import classes from './incomes.component.module.scss';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Dropdown,
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
import { useInfiniteScroll } from 'src/common/hooks/infinite-scroll.hook';
import { BettweenAttribute } from 'src/models/search.model';

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
    loading,
    setSorting,
    setQuickSearch,
    requestNextPage,
    addBetweenAttribute,
    removeBetweenAttribute,
  } = useListManager(IncomeService.searchEntities, transformEntity);

  const setDate =
    (type: 'from' | 'to'): DatePickerProps['onChange'] =>
    (date, dateString) => {
      console.log(dateString);

      if (dateString) {
        const newBetweenAttribute: BettweenAttribute = {
          attribute: type === 'from' ? 'from_date' : 'to_date',
          attributeValue: dateString as string,
          attributeType: 'DATE',
          type: type === 'from' ? 'GREATER_OR_EQUAL' : 'SMALLER_OR_EQUAL',
        };
        console.log(newBetweenAttribute);

        addBetweenAttribute(newBetweenAttribute);
      } else if (type === 'from') {
        removeBetweenAttribute('from_date');
      } else if (type === 'to') {
        removeBetweenAttribute('to_date');
      }
    };

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

  const containerRef = useInfiniteScroll(requestNextPage, loading);
  const searchInputRef = useRef<{ clearSearch: () => void } | null>(null);

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Space.Compact>
          <SearchInput
            ref={searchInputRef}
            placeholder={t('searchFor')}
            onSearch={(value) => setQuickSearch(value)}
          />
        </Space.Compact>
        <DatePicker
          placeholder={t('fromDate')}
          type="date"
          onChange={setDate('from')}
        />
        <DatePicker
          placeholder={t('toDate')}
          type="date"
          onChange={setDate('to')}
        />
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
      <div className={classes.incomes} ref={containerRef}>
        <Table<InvoiceTableDataType>
          className={classes.incomesTable}
          columns={columns}
          dataSource={incomes}
          pagination={false}
          sticky={{ offsetHeader: 0 }}
        />
      </div>
    </div>
  );
};
