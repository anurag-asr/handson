import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Space, Table, Modal, Input, Select } from "antd";
import { useEffect, useState } from "react";
import {
  ADD_PERSON_DATA,
  DELETE_PERSON_QUERY,
  EDITING_PERSON_QUERY,
  PERSON_LIST_QUERY,
} from "../../graphql/person";

const { Column } = Table;

const Persons = () => {
  const [sortby, setSortBy] = useState("DESC");
  const [person, setPerson] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [editPersonId, setEditPersonId] = useState("");
  const [editPerson, setEditPerson] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [sourceData, setSourceData] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    gender: "",
    popularity: "",
    knownForDepartment: "",
  });

  const [personDataFetch] = useLazyQuery(PERSON_LIST_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setSourceData(res.listPersons.data);
    },
  });

  const [deletePerson] = useMutation(DELETE_PERSON_QUERY, {
    fetchPolicy: "network-only",
    onCompleted() {
      setSourceData((pre) => {
        return pre.filter((elem) => elem.id !== deleteId);
      });
    },
  });

  const [editPersonData] = useMutation(EDITING_PERSON_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setSourceData((pre) => {
        return pre.map((person) => {
          if (person.id === editPerson.id) {
            return editPerson;
          } else {
            return person;
          }
        });
      });
    },
  });

  const [addPersonData] = useMutation(ADD_PERSON_DATA, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setPerson("success-full");
    },
  });

  const deleteRecord = async (record) => {
    Modal.confirm({
      title: "Are You sure you want to delete",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDeleteId(record.id);
        deletePerson({
          variables: {
            id: record.id,
          },
        });
      },
    });
  };

  const onEditPerson = async (record) => {
    setIsEditable(true);
    setEditPersonId(record.id);
    setEditPerson({ ...record });
  };

  const handleAddPerson = () => {
    setIsAdd(true);
  };

  const personData = () => {
    personDataFetch({
      variables: {
        sort: {
          field: "createdAt",
          order: sortby,
        },
        filter: {
          searchTerm: searchedText,
        },
      },
    });
  };

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  let id;
  const handleChange = (e) => {
    clearTimeout(id);
    id = setTimeout(() => {
      setSearchedText(e.target.value);
    }, 1000);
  };

  const handelInfiniteScroll = () => {
    console.log("setTarget e target value");
  };

  useEffect(() => {
    personData();
    // eslint-disable-next-line
  }, [person, sortby, searchedText]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div className="persona_page">
      <div className="persona_page_btn">
        <Button onClick={handleAddPerson}>Add New Person</Button>
        <Input.Search placeholder="Enter Your Text" onChange={handleChange} />
        <Select
          defaultValue="DESC"
          style={{
            width: 120,
            marginLeft: "5px",
          }}
          onChange={handleSortBy}
          options={[
            {
              value: "ASC",
              label: "ASC",
            },
            {
              value: "DESC",
              label: "DESC",
            },
          ]}
        />
      </div>

      {sourceData && (
        <Table
          dataSource={sourceData}
          rowKey={(obj) => obj.id}
          className="personScrollDiv"
        >
          <Column title="Name" dataIndex="name" />
          <Column title="Gender" dataIndex="gender" key="gender" />
          <Column
            title="Department"
            dataIndex="knownForDepartment"
            key="knownForDepartment"
          />
          <Column title="Popularity" dataIndex="popularity" />

          <Column
            title="Action"
            render={(_, record) => (
              <Space size="middle">
                <EditOutlined onClick={() => onEditPerson(record)} />
                <Button
                  onClick={() => {
                    deleteRecord(record);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
          />
        </Table>
      )}
      <Modal
        title="Edit person"
        open={isEditable}
        onCancel={() => {
          setIsEditable(false);
        }}
        onOk={() => {
          editPersonData({
            variables: {
              id: editPersonId,
              data: {
                name: editPerson?.name,
                gender: editPerson?.gender,
                knownForDepartment: editPerson.knownForDepartment,
                popularity: Number(editPerson.popularity),
              },
            },
          });
          setIsEditable(false);
        }}
      >
        <Input
          value={editPerson?.name}
          onChange={(e) => {
            setEditPerson({ ...editPerson, name: e.target.value });
          }}
        />
        <Input
          value={editPerson?.gender.toUpperCase()}
          onChange={(e) => {
            setEditPerson({
              ...editPerson,
              gender: e.target.value.toUpperCase(),
            });
          }}
        />
        <Input
          value={editPerson?.popularity}
          type="number"
          onChange={(e) => {
            setEditPerson({ ...editPerson, popularity: e.target.value });
          }}
        />
        <Input
          value={editPerson?.knownForDepartment}
          onChange={(e) => {
            setEditPerson({
              ...editPerson,
              knownForDepartment: e.target.value,
            });
          }}
        />
      </Modal>
      <Modal
        title="Add person"
        open={isAdd}
        onCancel={() => {
          setIsAdd(false);
        }}
        onOk={() => {
          addPersonData({
            variables: {
              data: newPerson,
            },
          });
          setIsAdd(false);
        }}
      >
        <Input
          value={newPerson.name}
          onChange={(e) => {
            setNewPerson({ ...newPerson, name: e.target.value });
          }}
          placeholder="Enter Name of A person"
        />
        <Input
          value={newPerson.gender.toUpperCase()}
          onChange={(e) => {
            setNewPerson({ ...newPerson, gender: e.target.value });
          }}
          placeholder="gender Value"
        />
        <Input
          value={newPerson.popularity}
          type="number"
          onChange={(e) => {
            setNewPerson({ ...newPerson, popularity: Number(e.target.value) });
          }}
          placeholder="write popularity in Numbers"
        />
        <Input
          value={newPerson.knownForDepartment}
          onChange={(e) => {
            setNewPerson({ ...newPerson, knownForDepartment: e.target.value });
          }}
          placeholder="Enter Your Department"
        />
      </Modal>
    </div>
  );
};

export default Persons;
