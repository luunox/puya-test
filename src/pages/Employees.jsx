/** @format */
import { Button, ConfigProvider, DatePicker, Form, Input, message, Modal, Space, Table, Tag } from "antd";
import locale from "antd/es/locale/es_ES";
import moment from "moment";
import { useEffect, useState } from "react";
import "./es-es";

const { Search } = Input;

const original = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: ["nice", "developer"] },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park", tags: ["loser"] },
  { key: "3", name: "Joe Black", age: 54, address: "Sidney No. 1 Lake Park", tags: ["nice", "teacher"] },
  { key: "4", name: "Soe Veltra", age: 22, address: "Sidney No. 1 Lake Park", tags: ["developer"] },
  { key: "5", name: "Jack Doe", age: 21, address: "Sidney No. 1 Lake Park", tags: ["cool", "teacher"] },
  { key: "6", name: "Sevelt Banner", age: 37, address: "Sidney No. 1 Lake Park", tags: ["loser", "developer"] },
  { key: "7", name: "Silah Fox", age: 68, address: "Sidney No. 1 Lake Park", tags: ["nice"] },
  { key: "8", name: "Kyuong Hyuung", age: 59, address: "Sidney No. 1 Lake Park", tags: ["nice", "loser"] },
  { key: "9", name: "Ganbling Strong", age: 86, address: "Sidney No. 1 Lake Park", tags: ["loser", "teacher"] },
  { key: "10", name: "Pedro Backer", age: 91, address: "Sidney No. 1 Lake Park", tags: ["cool", "developer"] },
  { key: "11", name: "Boros Smith", age: 36, address: "Sidney No. 1 Lake Park", tags: ["teacher"] },
  { key: "12", name: "Gino Grey", age: 24, address: "Sidney No. 1 Lake Park", tags: ["cool", "loser"] },
  { key: "13", name: "Susan Serena", age: 69, address: "Sidney No. 1 Lake Park", tags: ["cool", "developer"] },
  { key: "14", name: "Cuyo Cabro", age: 41, address: "Sidney No. 1 Lake Park", tags: ["nice", "developer"] },
];

const Employees = () => {
  const [formAdd] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(original);
  const [filter, setFilter] = useState(Array());
  const [modalAddOpen, setModalAddOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dat) => {
        // setData(dat);
        message.success("Data obtenida.");
      })
      .catch(() => {
        message.error("Algo falló.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onFinish = (values) => {
    setModalAddOpen(false);
    const birthdate = moment(values.birthdate).format("YYYY/MM/DD");
    setData([...data, { key: moment(new Date()).toISOString(), name: String(values.name), age: moment(new Date()).diff(values.birthdate, "years"), address: "", tags: [""] }]);
    formAdd.resetFields();
  };

  const filterDropdown = () => {
    const onSearch = (e) => setFilter([data.filter((val) => val.name.match(`.*${e}.*`))]);
    return (
      <div style={{ padding: 10 }}>
        <Search placeholder="Ingrese su búsqueda" onSearch={onSearch} enterButton />
      </div>
    );
  };

  const filterIcon = () => <div style={{ fontSize: 20, padding: 2 }}>🔍</div>;
  const actionRender = (_, record) => (
    <Space size="middle">
      <a>Invitar {record.name}</a>
      <a>Borrar</a>
    </Space>
  );
  const tagRender = (_, { tags }) =>
    tags.map((tag) => {
      let color = tag.length > 5 ? "geekblue" : "green";
      if (tag === "loser") color = "volcano";

      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    });

  const columns = [
    { title: "Nombre", dataIndex: "name", key: "name", render: (text) => <a>{text}</a>, width: 140, fixed: true, filterDropdown, filterIcon },
    { title: "Edad", dataIndex: "age", key: "age", width: 66, fixed: true },
    { title: "Dirección", dataIndex: "address", key: "address" },
    { title: "Etiquetas", key: "tags", dataIndex: "tags", render: tagRender },
    { title: "", key: "action", render: actionRender },
  ];

  const typeTemplate = "'${name}' no es un ${type} válido!";
  const validateMessages = {
    required: "${label} es requerido!",
    string: {
      min: "'${name}' tiene que tener al menos ${min} caracteres",
      max: "'${name}' no puede tener mas de ${max} caracteres",
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
  };

  return (
    <>
      <Modal
        centered
        destroyOnClose
        closable={false}
        open={modalAddOpen}
        maskClosable={false}
        title="Añadir Empleado"
        footer={[
          <Button key="back" onClick={() => setModalAddOpen(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => formAdd.submit()}>
            Añadir
          </Button>,
        ]}
      >
        <Form form={formAdd} onFinish={onFinish} validateMessages={validateMessages}>
          <Input.Group compact style={{ display: "flex" }}>
            <Form.Item name="name" label="Nombre" rules={[{ required: true, min: 3, max: 30 }]} style={{ width: "49%", marginRight: "1%" }}>
              <Input placeholder="Ingrese su nombre" />
            </Form.Item>
            <Form.Item name="lastname" label="Apellido" rules={[{ required: true, min: 3, max: 30 }]} style={{ width: "49%", marginLeft: "1%" }}>
              <Input placeholder="Ingrese su apellido" />
            </Form.Item>
          </Input.Group>
          <ConfigProvider locale={locale}>
            <Form.Item name="birthdate" label="Fecha de nacimiento" rules={[{ required: true }]}>
              <DatePicker placeholder="Ingrese su fecha de nacimiento" style={{ width: "100%" }} />
            </Form.Item>
          </ConfigProvider>
        </Form>
      </Modal>
      <Button onClick={() => setModalAddOpen(true)} type="primary" style={{ marginBottom: 16 }}>
        Añadir Empleado
      </Button>
      <Table
        bordered
        columns={columns}
        style={{ width: "80%" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "1000px", y: "360px" }}
        dataSource={filter.length > 0 ? filter : data}
      />
    </>
  );
};

export default Employees;
