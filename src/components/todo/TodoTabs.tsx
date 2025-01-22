import { TodoTabsKey } from '@/store/atoms'
import React from 'react'
import styled from "@emotion/styled";

interface TabsProps {
  selectedTab: TodoTabsKey;
  onChangeTab: (tab: TodoTabsKey) => void;
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  button {
    margin: 0 8px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
    &.active {
      background-color: #2182f3;
      color: #fff;
    }
  }
`;

const TodoTabs = ({ selectedTab, onChangeTab }: TabsProps) => {
  return (
    <TabsWrapper>
      {
        ['all', 'todo', 'done'].map((tab) => {
          return (
            <button
              key={tab}
              className={selectedTab === tab ? 'active' : ''}
              onClick={() => onChangeTab(tab as TodoTabsKey)}
            >
              { tab === 'all' ? 'All' : tab === 'todo' ? 'To Do' : 'Done' }
            </button>
          )
        })
      }
    </TabsWrapper>
  )
}

export default TodoTabs