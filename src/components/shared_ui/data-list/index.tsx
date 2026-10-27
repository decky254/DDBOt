import React from 'react';

const DataList: React.FC<any> = ({ data_source = [], rowRenderer }: any) => {
    return (
        <div className="dc-data-list">
            {data_source.map((item: any, index: number) => rowRenderer?.({ row: item, index }))}
        </div>
    );
};

export default DataList;
