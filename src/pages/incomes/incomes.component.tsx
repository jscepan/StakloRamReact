import React, { JSX, useContext, useEffect, useRef } from 'react';
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
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from 'src/components/shared/search-input/search-input.component';
import { useInfiniteScroll } from 'src/common/hooks/infinite-scroll.hook';
import { BettweenAttribute } from 'src/models/search.model';
import { IncomeCreateEdit } from '../income-create-edit/income-create-edit.component';
import { LoaderContext } from 'src/common/providers/loading-context.provider';
import { ModalContext } from 'src/common/providers/modal-context.provider';

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
  const loadingCtx = useContext(LoaderContext);
  const modalCtx = useContext(ModalContext);

  const {
    data: incomes,
    isLoading: loading,
    setSorting,
    setQuickSearch,
    requestNextPage,
    requestFirstPage,
    addBetweenAttribute,
    removeBetweenAttribute,
  } = useListManager(IncomeService.searchEntities, transformEntity);

  useEffect(() => {
    if (loading) {
      loadingCtx?.showLoader();
    } else {
      loadingCtx?.hideLoader();
    }
  }, [loading, loadingCtx]);

  const setDate =
    (type: 'from' | 'to'): DatePickerProps['onChange'] =>
    (date, dateString) => {
      if (dateString) {
        const newBetweenAttribute: BettweenAttribute = {
          attribute: type === 'from' ? 'from_date' : 'to_date',
          attributeValue: dateString as string,
          attributeType: 'DATE',
          type: type === 'from' ? 'GREATER_OR_EQUAL' : 'SMALLER_OR_EQUAL',
        };
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
      key: 'edit',
      render: (record) => (
        <Button
          onClick={() => openCreateEditPopup(record.oid)}
          icon={<EditOutlined />}
        />
      ),
    },
    {
      title: t('delete'),
      key: 'action',
      render: () => <Button icon={<DeleteOutlined />} />,
    },
  ];

  const openCreateEditPopup = async (oid?: string) => {
    console.log(oid);
    try {
      const result = await modalCtx?.open(IncomeCreateEdit, { oid });
      console.log('Rezultat:', result); // Obrađujemo podatke koje je modal vratio
    } catch {
      console.log('Modal zatvoren bez rezultata');
    }
  };

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
        <Button
          type="primary"
          onClick={() => openCreateEditPopup()}
          icon={<PlusOutlined />}
        >
          {t('createIncome')}
        </Button>

        {/* <IncomeCreateEdit incomeCreateEditFn={requestFirstPage} /> */}
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
