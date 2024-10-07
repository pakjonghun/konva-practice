import { FC } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import DropDown from '../../../components/DropDown';
import { nodeStore } from '../../../store/boardStore/node/nodeStore';
import { observer } from 'mobx-react-lite';

interface Props {
  nodeId: string;
}

const ChangePinType: FC<Props> = ({ nodeId }) => {
  const components = nodeStore.getTargetNodeData(nodeId).nodeData.components;
  const setPinType = (pinId: string, type: string) => {
    nodeStore.pinStore.setType(pinId, type);
  };

  const selectTypeList = [
    { id: 'string', label: '문자' },
    {
      id: 'number',
      label: '숫자',
    },
  ];

  return (
    <Flex direction="column" gap={'2'} className="ml-3">
      {components.map((c) => {
        return (
          <Flex key={c.id} gap={'2'}>
            <Text>{c.properties.name}</Text>
            <DropDown
              trigger={<Button>{c.properties.type}</Button>}
              menuList={selectTypeList}
              onClickMenu={(menu) => setPinType(c.id, menu.id)}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default observer(ChangePinType);
