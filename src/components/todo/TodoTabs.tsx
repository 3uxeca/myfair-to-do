import { TodoTabsKey } from '@/store/atoms'
import React from 'react'
import styled from '@emotion/styled';

interface TabsProps {
  selectedTab: TodoTabsKey;
  onChangeTab: (tab: TodoTabsKey) => void;
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  div {
    width: 108px;
    padding: 8px 0;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &.hover, &.active {
      background-color: #ebf4ff;
      color: #2182f3;
    }
  }
`;

const TodoTabs = ({ selectedTab, onChangeTab }: TabsProps) => {
  return (
    <TabsWrapper>
      {
        ['all', 'todo', 'done'].map((tab) => {
          return (
            <div
              key={tab}
              role='tab'
              className={selectedTab === tab ? 'active' : ''}
              onClick={() => onChangeTab(tab as TodoTabsKey)}
            >
              { tab === 'all' ? 'All' : tab === 'todo' ? 'To Do' : 'Done' }
            </div>
          )
        })
      }
    </TabsWrapper>
  )
}

export default TodoTabs