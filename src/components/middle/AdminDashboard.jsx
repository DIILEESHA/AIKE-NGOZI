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

const { Title } = Typography;

const AdminDashboard = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Dummy password
  const handleLogin = () => {
    if (password === "an26!") {
      setAuthenticated(true);
      fetchRsvps();
    } else {
      message.error("Incorrect password!");
    }
  };

  // Fetch RSVPs
  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "rsvps"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRsvps(data);
    } catch (err) {
      message.error("Failed to fetch RSVPs");
    }
    setLoading(false);
  };

  // Delete RSVP
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      setRsvps(rsvps.filter((r) => r.id !== id));
      message.success("RSVP deleted successfully");
    } catch {
      message.error("Delete failed");
    }
  };

  // Export Excel (Clean format)
  const exportExcel = () => {
    const formattedData = rsvps.map((item) => ({
      FirstName: item.firstName,
      LastName: item.lastName,
      Email: item.email,
      AptSuite: item.aptSuite,
      Zip: item.zip,
      Country: item.country,
      SubmittedAt: item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");
    XLSX.writeFile(workbook, "RSVP_List.xlsx");
  };

  // Table Columns
  const columns = [
    {
      title: "Full Name",
      key: "name",
      render: (_, record) => (
        <strong>{record.firstName} {record.lastName}</strong>
      ),
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text) => (
        <Badge color="blue" text={text || "N/A"} />
      ),
      responsive: ["lg"],
    },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (timestamp) =>
        timestamp?.seconds
          ? new Date(timestamp.seconds * 1000).toLocaleString()
          : "N/A",
      responsive: ["lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRsvp(record);
              setViewModal(true);
            }}
          />
          <Popconfirm
            title="Delete this RSVP?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // LOGIN SCREEN
  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fa",
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

  // DASHBOARD
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
            RSVP Admin Dashboard
          </Title>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={exportExcel}
          >
            Download Excel
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={rsvps}
          rowKey="id"
          loading={loading}
          bordered
          scroll={{ x: "max-content" }}   // ✅ responsive horizontal scroll
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* VIEW MODAL */}
      <Modal
        open={viewModal}   // ✅ FIXED (AntD v5)
        title="RSVP Full Details"
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRsvp && (
          <div style={{ lineHeight: 2 }}>
            <p><strong>First Name:</strong> {selectedRsvp.firstName}</p>
            <p><strong>Last Name:</strong> {selectedRsvp.lastName}</p>
            <p><strong>Email:</strong> {selectedRsvp.email}</p>
            <p><strong>Apt / Suite:</strong> {selectedRsvp.aptSuite || "N/A"}</p>
            <p><strong>ZIP:</strong> {selectedRsvp.zip || "N/A"}</p>
            <p><strong>Country:</strong> {selectedRsvp.country || "N/A"}</p>
            <p><strong>Submitted At:</strong> {
              selectedRsvp.createdAt?.seconds
                ? new Date(selectedRsvp.createdAt.seconds * 1000).toLocaleString()
                : "N/A"
            }</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
