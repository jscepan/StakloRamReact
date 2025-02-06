import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { JSX, useEffect, useImperativeHandle, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  ref: any;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  ref,
}): JSX.Element => {
  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    if (searchText === null) return; // Preskačemo prvi render

    const handler = setTimeout(() => {
      if (searchText?.length >= 3 || searchText === '') {
        onSearch(searchText);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, onSearch]);

  useImperativeHandle(ref, () => ({
    clearSearch: () => setSearchText(null),
  }));

  return (
    <Input
      placeholder={placeholder}
      value={searchText ?? ''}
      onChange={(e) => setSearchText(e.target.value)}
      width={'auto'}
      suffix={
        <CloseOutlined
          onClick={() => setSearchText('')}
          style={{
            visibility: (searchText ?? '')?.length >= 3 ? 'visible' : 'hidden',
          }}
        />
      }
    />
  );
};
