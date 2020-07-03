import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import JsonEditor from '@/pages/Meta/jsoneditor'

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const jsData = {
    name: 'sanbingo',
    age: 18,
    count: 100
  }
  return (
    <PageHeaderWrapper content="Meta设置" className={styles.main}>
      
        <JsonEditor value={jsData} onChange={(data) => console.log('change data: ', data)} getJson={(json) => {
          console.log('json: ', json)
        }}
        />
      
    </PageHeaderWrapper>
  );
};
