import { DropdownMenu } from '@radix-ui/themes';
import { FC, ReactNode } from 'react';

export type DropMenu = {
  id: string;
  label: string;
};

interface Props {
  trigger: ReactNode;
  menuList: DropMenu[];
  onClickMenu: (menu: DropMenu) => void;
}

const DropDown: FC<Props> = ({ trigger, menuList, onClickMenu }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {/* <Button variant="soft">
			Options
			<DropdownMenu.TriggerIcon />
		</Button> */}
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {menuList.map((menu) => {
          return (
            <DropdownMenu.Item onClick={() => onClickMenu(menu)} key={menu.id}>
              {menu.label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropDown;
