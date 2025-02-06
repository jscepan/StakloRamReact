import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { JSX, useEffect, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
}): JSX.Element => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText.length >= 3 || searchText === '') {
        onSearch(searchText);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, onSearch]);

  return (
    <Input
      placeholder={placeholder}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      width={'auto'}
      suffix={
        <CloseOutlined
          onClick={() => setSearchText('')}
          style={{ visibility: searchText.length >= 3 ? 'visible' : 'hidden' }}
        />
      }
    />
  );
};
