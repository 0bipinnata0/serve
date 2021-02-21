import { CheckSquareOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Descriptions, Input } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';

const LabelInputTran = ({
  title,
  contend,
  id,
  dispatch,
}: {
  title: string;
  contend: string;
  id: string;
  dispatch: any;
}) => {
  const [isInput, setIsInput] = useState(false);
  const [val, setVal] = useState(contend);

  useEffect(() => {
    setVal(contend);
  }, [contend]);

  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item
          label={title}
          labelStyle={{ backgroundColor: 'initial', width: '80px', padding: '20px 0' }}
        >
          <Input
            placeholder="项目组负责人很懒，什么都没有留下"
            value={val}
            bordered={isInput}
            disabled={!isInput}
            onChange={(e) => setVal(e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions>
      {isInput ? (
        <Button
          type="primary"
          icon={<CheckSquareOutlined />}
          size="large"
          onClick={() => {
            setIsInput((value) => !value);
            const action = { type: `accountSettings/${id}` };
            action[id] = val;
            dispatch(action);
          }}
        >
          确定
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="large"
          onClick={() => setIsInput((value) => !value)}
        >
          修改
        </Button>
      )}
    </>
  );
};

export default LabelInputTran;
