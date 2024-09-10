import { Pagination } from "antd";

const CustomPagination = ({ total, current, onChange, pageSize }) => {
    // without page 
    
return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", margin: "10px" }}>
        <Pagination
            total={total}
            current={current}
            defaultCurrent={1}
            defaultPageSize={pageSize}
            onChange={onChange}
            showSizeChanger={false}
        />
    </div>
);
}

export default CustomPagination;