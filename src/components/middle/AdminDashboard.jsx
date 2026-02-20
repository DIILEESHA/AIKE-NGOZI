import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Badge,
  Input,
  Space,
  message,
  Popconfirm,
  Card,
  Typography,
  DatePicker,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const [addresses, setAddresses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  /* =========================
     AUTH
  ========================= */

  const handleLogin = () => {
    if (password === "an26!") {
      setAuthenticated(true);
      fetchData();
    } else {
      message.error("Incorrect password!");
    }
  };

  /* =========================
     FETCH DATA
  ========================= */

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "rsvps"));
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setAddresses(data);
      setFilteredData(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch addresses");
    }
    setLoading(false);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "addresses", id));
      const updated = addresses.filter((item) => item.id !== id);
      setAddresses(updated);
      setFilteredData(updated);
      message.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Delete failed");
    }
  };

  /* =========================
     SEARCH + FILTER
  ========================= */

  useEffect(() => {
    let data = [...addresses];

    // Search filter
    if (searchText) {
      data = data.filter((item) =>
        `${item.firstName} ${item.lastName} ${item.email}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      );
    }

    // Date filter (using createdAt)
    if (dateRange.length === 2) {
      data = data.filter((item) => {
        if (!item.createdAt?.seconds) return false;

        const itemDate = dayjs(item.createdAt.seconds * 1000);

        return (
          itemDate.isAfter(dateRange[0].startOf("day")) &&
          itemDate.isBefore(dateRange[1].endOf("day"))
        );
      });
    }

    setFilteredData(data);
  }, [searchText, dateRange, addresses]);

  /* =========================
     EXPORT EXCEL
  ========================= */

  const exportExcel = () => {
    const formatted = filteredData.map((item) => ({
      FirstName: item.firstName,
      LastName: item.lastName,
      Email: item.email,
      AddressLine1: item.addressLine1 || "",
      AddressLine2: item.addressLine2 || "",
      City: item.city || "",
      State: item.state || "",
      PostalCode: item.zip || "", // FIXED
      Country: item.country || "",
      Status: item.isComplete ? "Complete" : "Incomplete",
      CreatedAt: item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Addresses");
    XLSX.writeFile(workbook, "Address_List.xlsx");
  };

  /* =========================
     TABLE COLUMNS
  ========================= */

  const columns = [
    {
      title: "Full Name",
      render: (_, record) => (
        <strong>
          {record.firstName} {record.lastName}
        </strong>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Status",
      render: (_, record) => (
        <Badge
          color={record.isComplete ? "green" : "red"}
          text={record.isComplete ? "Complete" : "Incomplete"}
        />
      ),
    },
    {
      title: "Created",
      render: (_, record) =>
        record.createdAt?.seconds
          ? new Date(record.createdAt.seconds * 1000).toLocaleString()
          : "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setViewModal(true);
            }}
          />
          <Popconfirm
            title="Delete this entry?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* =========================
     LOGIN SCREEN
  ========================= */

  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 350, textAlign: "center" }}>
          <LockOutlined style={{ fontSize: 30, marginBottom: 15 }} />
          <Title level={4}>Admin Login</Title>
          <Input.Password
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleLogin}
            style={{ marginBottom: 15 }}
          />
          <Button type="primary" block onClick={handleLogin}>
            Login
          </Button>
        </Card>
      </div>
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Address Admin Dashboard
          </Title>

          <Space wrap>
            <Input
              placeholder="Search name or email..."
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />

            <RangePicker onChange={(dates) => setDateRange(dates || [])} />

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={exportExcel}
            >
              Export Excel
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          bordered
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* VIEW MODAL */}
      <Modal
        open={viewModal}
        title="Full Address Details"
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div style={{ lineHeight: 2 }}>
            <p>
              <strong>First Name:</strong> {selectedRecord.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedRecord.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedRecord.email}
            </p>
            <p>
              <strong>Address Line 1:</strong> {selectedRecord.addressLine1}
            </p>
            <p>
              <strong>Address Line 2:</strong>{" "}
              {selectedRecord.addressLine2 || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {selectedRecord.city}
            </p>
            <p>
              <strong>State:</strong> {selectedRecord.state || "N/A"}
            </p>
            <p>
              <strong>Postal Code:</strong> {selectedRecord.zip || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {selectedRecord.country}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedRecord.isComplete ? "Complete" : "Incomplete"}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {selectedRecord.createdAt?.seconds
                ? new Date(
                    selectedRecord.createdAt.seconds * 1000,
                  ).toLocaleString()
                : "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
