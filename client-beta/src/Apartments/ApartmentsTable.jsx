import {Table} from "antd";
import {useNavigate} from "react-router-dom";

const columns = [
    {
        title: 'رقم الشقة',
        dataIndex: 'apartmentNumber',
        key: 'apartmentNumber',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'اسم البناية',
        dataIndex: 'building',
        key: 'building',

    },
    {
        title: 'عدد الغرف',
        dataIndex: 'rooms',
        key: 'room',
    },
    {
        title: 'الإيرادات',
        dataIndex: 'revenue',
        key: 'revenue',
    },
    {
        title: 'المصروفات',
        dataIndex: 'expenses',
        key: 'expenses',
    }
];

const ApartmentsTable = (props) => {
    const navigate = useNavigate();
    const handleRowClick = (record, index) => {
        navigate(`/apartments/${record.building}`);
        // console.log(index + 1);
        // console.log(record.building);
    }

    const tableProps = {
        dataSource: props.dataSource,
        columns: columns,
        onRow: (record, index) => ({
            onClick: () => handleRowClick(record, index)
        }),
    };

    return (
        <div className="apartmentsTable">
            <Table {...tableProps} />
        </div>
    );
}

export default  ApartmentsTable;