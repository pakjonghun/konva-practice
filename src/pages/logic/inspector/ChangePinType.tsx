import { Button } from '@radix-ui/themes';
import DropDown from '../../../components/DropDown';

const ChangePinType = () => {
  const selectTypeList = [
    { id: 'string', label: '문자' },
    {
      id: 'number',
      label: '숫자',
    },
  ];

  return (
    <DropDown
      trigger={<Button>타입 선택</Button>}
      menuList={selectTypeList}
      onClickMenu={() => {}}
    />
  );
};

export default ChangePinType;
